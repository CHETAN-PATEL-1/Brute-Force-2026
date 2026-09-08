package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.dto.ExtractedSkill;
import com.BruteForce.demo.ai.dto.ResumeExtractModelOutput;
import com.BruteForce.demo.ai.dto.ResumeExtractRequest;
import com.BruteForce.demo.ai.dto.ResumeExtractResponse;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class ResumeParsingAiService {

	private static final Logger log = LoggerFactory.getLogger(ResumeParsingAiService.class);

	private static final String SYSTEM_PROMPT =
			"""
			You are an AI resume and certificate parser for Skill Genz, a modern skill mapping and career platform.
			Your job is to analyze the provided resume or certificate text and extract key skills.
			For each skill, determine:
			1. skill: The canonical name of the skill, tool, framework, or technology (e.g., "Java", "React", "Docker", "Agile").
			2. proficiency: A rough proficiency estimate ("Beginner", "Intermediate", or "Advanced") inferred from project context or years mentioned.
			3. category: The domain category (e.g., "Programming Language", "Framework", "Database", "Cloud", "Soft Skill").

			Reply with a single valid JSON object only. No markdown fences, no conversational prose.
			JSON format:
			{"skills":[{"skill":"string","proficiency":"string","category":"string"}]}
			""";

	private final OllamaClient ollamaClient;
	private final ObjectMapper objectMapper;

	public ResumeParsingAiService(OllamaClient ollamaClient, ObjectMapper objectMapper) {
		this.ollamaClient = ollamaClient;
		this.objectMapper = objectMapper;
	}

	public ResumeExtractResponse extractSkills(ResumeExtractRequest request) {
		if (request.resumeText() == null || request.resumeText().isBlank()) {
			throw new IllegalArgumentException("resumeText must not be blank");
		}

		String userPrompt = buildUserPrompt(request.resumeText());
		String raw = ollamaClient.generate(SYSTEM_PROMPT, userPrompt, true);

		ResumeExtractModelOutput parsed = JsonExtractor.parseObject(raw, ResumeExtractModelOutput.class, objectMapper);

		if (parsed.skills() == null || parsed.skills().isEmpty()) {
			log.warn("Resume parsing model returned empty skills list");
			throw new AiJsonParseException("Failed to extract skills from resume content");
		}

		List<ExtractedSkill> cleaned = parsed.skills().stream()
				.filter(s -> s.skill() != null && !s.skill().isBlank())
				.map(s -> new ExtractedSkill(
						s.skill().trim(),
						normalizeProficiency(s.proficiency()),
						s.category() == null ? "General" : s.category().trim()))
				.toList();

		return ResumeExtractResponse.of(cleaned);
	}

	private static String buildUserPrompt(String text) {
		return """
				Resume / Certificate text content:
				---
				%s
				---

				Extract skills and return strictly in JSON format:
				{"skills":[{"skill":"...","proficiency":"...","category":"..."}]}
				""".formatted(text.trim());
	}

	private static String normalizeProficiency(String proficiency) {
		if (proficiency == null || proficiency.isBlank()) {
			return "Intermediate";
		}
		String p = proficiency.trim().toLowerCase();
		if (p.contains("adv") || p.contains("expert") || p.contains("lead")) {
			return "Advanced";
		}
		if (p.contains("beg") || p.contains("entry") || p.contains("basic")) {
			return "Beginner";
		}
		return "Intermediate";
	}
}
