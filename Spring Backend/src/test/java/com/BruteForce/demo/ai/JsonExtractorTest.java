package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.BruteForce.demo.ai.dto.SkillGapModelOutput;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

class JsonExtractorTest {

	private final ObjectMapper mapper = new tools.jackson.databind.json.JsonMapper();

	@Test
	void extractsObjectWrappedInProseAndFences() {
		String raw =
				"""
				Sure, here you go:
				```json
				{"improvementAreas":[{"skill":"AWS","why":"cloud roles need it","action":"Complete a labs course"}]}
				```
				Hope that helps!
				""";

		SkillGapModelOutput parsed = JsonExtractor.parseObject(raw, SkillGapModelOutput.class, mapper);
		assertEquals(1, parsed.improvementAreas().size());
		assertEquals("AWS", parsed.improvementAreas().getFirst().skill());
	}

	@Test
	void failsWhenNoJsonObjectPresent() {
		assertThrows(
				AiJsonParseException.class,
				() -> JsonExtractor.parseObject("no json here", SkillGapModelOutput.class, mapper));
	}
}
