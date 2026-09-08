package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.dto.PortfolioBioRequest;
import com.BruteForce.demo.ai.dto.PortfolioBioResponse;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PortfolioAiService {

	private static final Logger log = LoggerFactory.getLogger(PortfolioAiService.class);

	private static final String SYSTEM_PROMPT =
			"""
			You are an expert career consultant writing digital portfolio bios for Skill Genz.
			Write a compelling, professional 3 to 4 sentence portfolio bio summarizing the student's background, core competencies, and career goals.
			Do NOT output JSON, markdown fences, headings, or bullet points.
			Return only plain professional text suitable for direct display.
			""";

	private final OllamaClient ollamaClient;

	public PortfolioAiService(OllamaClient ollamaClient) {
		this.ollamaClient = ollamaClient;
	}

	public PortfolioBioResponse generateBio(PortfolioBioRequest request) {
		String userPrompt = buildUserPrompt(request);
		String raw = ollamaClient.generate(SYSTEM_PROMPT, userPrompt, false);

		String cleaned = cleanBio(raw);
		return new PortfolioBioResponse(cleaned);
	}

	private static String buildUserPrompt(PortfolioBioRequest request) {
		StringBuilder sb = new StringBuilder();
		if (request.studentName() != null && !request.studentName().isBlank()) {
			sb.append("Student Name: ").append(request.studentName().trim()).append("\n");
		}
		if (request.targetRole() != null && !request.targetRole().isBlank()) {
			sb.append("Target Role / Aspirations: ").append(request.targetRole().trim()).append("\n");
		}
		appendList(sb, "Key Skills", request.skills());
		appendList(sb, "Projects", request.projects());
		appendList(sb, "Certifications", request.certifications());
		appendList(sb, "Achievements", request.achievements());

		sb.append("\nWrite a concise 3-4 sentence professional bio based on the above information.");
		return sb.toString();
	}

	private static void appendList(StringBuilder sb, String label, List<String> items) {
		if (items != null && !items.isEmpty()) {
			sb.append(label).append(": ").append(String.join(", ", items)).append("\n");
		}
	}

	private static String cleanBio(String text) {
		if (text == null || text.isBlank()) {
			return "";
		}
		String s = text.trim();
		// Strip markdown code fences if model accidentally wrapped output
		if (s.startsWith("```")) {
			int firstNl = s.indexOf('\n');
			if (firstNl > 0) {
				s = s.substring(firstNl + 1);
			}
			int lastFence = s.lastIndexOf("```");
			if (lastFence >= 0) {
				s = s.substring(0, lastFence);
			}
		}
		s = s.trim();
		// Strip leading and trailing quotes if any
		if (s.startsWith("\"") && s.endsWith("\"") && s.length() > 1) {
			s = s.substring(1, s.length() - 1).trim();
		}
		return s;
	}
}
