package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.domain.StudentProfileRepository;
import com.BruteForce.demo.ai.dto.ImprovementArea;
import com.BruteForce.demo.ai.dto.SkillGapModelOutput;
import com.BruteForce.demo.ai.dto.SkillGapRequest;
import com.BruteForce.demo.ai.dto.SkillGapResponse;
import com.BruteForce.demo.ai.dto.SkillScore;
import tools.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Comparator;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class SkillGapAiService {

	private static final Logger log = LoggerFactory.getLogger(SkillGapAiService.class);

	private static final String SYSTEM_PROMPT =
			"""
			You are a career advisor for Skill Genz, a modern skill mapping, internship, and career development platform.
			Reply with a single JSON object only. No markdown, no commentary.
			The JSON must match: {"improvementAreas":[{"skill":"string","why":"string","action":"string"}]}
			Give 2 to 4 improvement areas. Each action must be one concrete next step.
			""";

	private final OllamaClient ollamaClient;
	private final ObjectMapper objectMapper;
	private final ObjectProvider<StudentProfileRepository> studentProfiles;
	private final ConcurrentHashMap<String, SkillGapResponse> memoryCache = new ConcurrentHashMap<>();

	public SkillGapAiService(
			OllamaClient ollamaClient,
			ObjectMapper objectMapper,
			ObjectProvider<StudentProfileRepository> studentProfiles) {
		this.ollamaClient = ollamaClient;
		this.objectMapper = objectMapper;
		this.studentProfiles = studentProfiles;
	}

	public SkillGapResponse suggest(SkillGapRequest request) {
		String cacheKey = cacheKey(request);

		SkillGapResponse cached = readCache(request.studentId(), cacheKey);
		if (cached != null) {
			return cached.withCached(true);
		}

		String userPrompt = buildUserPrompt(request);
		String raw = ollamaClient.generate(SYSTEM_PROMPT, userPrompt, true);
		SkillGapModelOutput parsed = JsonExtractor.parseObject(raw, SkillGapModelOutput.class, objectMapper);

		if (parsed.improvementAreas() == null || parsed.improvementAreas().isEmpty()) {
			throw new AiJsonParseException();
		}

		SkillGapResponse fresh = new SkillGapResponse(parsed.improvementAreas(), false);
		writeCache(request.studentId(), cacheKey, fresh.improvementAreas());
		return fresh;
	}

	private SkillGapResponse readCache(String studentId, String cacheKey) {
		SkillGapResponse memory = memoryCache.get(studentId + "|" + cacheKey);
		if (memory != null) {
			return memory;
		}
		StudentProfileRepository repo = studentProfiles.getIfAvailable();
		if (repo == null) {
			return null;
		}
		try {
			return repo.findByStudentId(studentId)
					.filter(profile -> cacheKey.equals(profile.getSkillGapCacheKey()))
					.filter(profile -> profile.getSkillGapSuggestions() != null
							&& !profile.getSkillGapSuggestions().isEmpty())
					.map(profile -> new SkillGapResponse(profile.getSkillGapSuggestions(), true))
					.orElse(null);
		} catch (DataAccessException e) {
			log.debug("Skill-gap Mongo cache read skipped", e);
			return null;
		}
	}

	private void writeCache(String studentId, String cacheKey, List<ImprovementArea> areas) {
		memoryCache.put(studentId + "|" + cacheKey, new SkillGapResponse(areas, true));
		StudentProfileRepository repo = studentProfiles.getIfAvailable();
		if (repo == null) {
			return;
		}
		try {
			StudentProfile profile = repo.findByStudentId(studentId).orElseGet(StudentProfile::new);
			profile.setStudentId(studentId);
			profile.setSkillGapCacheKey(cacheKey);
			profile.setSkillGapSuggestions(areas);
			profile.setSkillGapGeneratedAt(Instant.now());
			repo.save(profile);
		} catch (DataAccessException e) {
			log.debug("Skill-gap Mongo cache write skipped", e);
		}
	}

	static String cacheKey(SkillGapRequest request) {
		List<SkillScore> sorted = request.currentSkills().stream()
				.sorted(Comparator.comparing(s -> s.skill().toLowerCase(Locale.ROOT)))
				.toList();
		StringBuilder raw = new StringBuilder();
		raw.append(nullToEmpty(request.postingId())).append('\n');
		raw.append(request.targetRole().trim().toLowerCase(Locale.ROOT)).append('\n');
		if (request.targetRequirements() != null) {
			request.targetRequirements().stream()
					.map(r -> r.trim().toLowerCase(Locale.ROOT))
					.sorted()
					.forEach(r -> raw.append(r).append('\n'));
		}
		for (SkillScore score : sorted) {
			raw.append(score.skill().trim().toLowerCase(Locale.ROOT))
					.append('=')
					.append(score.level())
					.append('\n');
		}
		return sha256(raw.toString());
	}

	private static String buildUserPrompt(SkillGapRequest request) {
		StringBuilder sb = new StringBuilder();
		sb.append("Current skills and levels (0-100):\n");
		for (SkillScore score : request.currentSkills()) {
			sb.append("- ").append(score.skill()).append(": ").append(score.level()).append('\n');
		}
		sb.append("\nTarget role or career interest: ").append(request.targetRole()).append('\n');
		if (request.postingId() != null && !request.postingId().isBlank()) {
			sb.append("Posting id: ").append(request.postingId()).append('\n');
		}
		if (request.targetRequirements() != null && !request.targetRequirements().isEmpty()) {
			sb.append("Target skill requirements:\n");
			for (String req : request.targetRequirements()) {
				sb.append("- ").append(req).append('\n');
			}
		} else {
			sb.append("No specific posting requirements were provided; infer typical requirements for the target role.\n");
		}
		sb.append(
				"""

				Return JSON only:
				{"improvementAreas":[{"skill":"...","why":"...","action":"..."}]}
				""");
		return sb.toString();
	}

	private static String sha256(String value) {
		try {
			byte[] digest = MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
			return HexFormat.of().formatHex(digest);
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException(e);
		}
	}

	private static String nullToEmpty(String value) {
		return value == null ? "" : value.trim();
	}
}
