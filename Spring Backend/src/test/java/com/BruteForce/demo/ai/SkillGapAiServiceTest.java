package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.BruteForce.demo.ai.domain.StudentProfileRepository;
import com.BruteForce.demo.ai.dto.SkillGapRequest;
import com.BruteForce.demo.ai.dto.SkillGapResponse;
import com.BruteForce.demo.ai.dto.SkillScore;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

class SkillGapAiServiceTest {

	private OllamaClient ollamaClient;
	private SkillGapAiService service;

	@BeforeEach
	void setUp() {
		ollamaClient = mock(OllamaClient.class);
		ObjectMapper mapper = new JsonMapper();
		@SuppressWarnings("unchecked")
		ObjectProvider<StudentProfileRepository> provider = mock(ObjectProvider.class);
		when(provider.getIfAvailable()).thenReturn(null);

		service = new SkillGapAiService(ollamaClient, mapper, provider);
	}

	@Test
	void suggestsSkillGapsAndCachesResult() {
		String mockLlmResponse = """
				```json
				{
				  "improvementAreas": [
				    {
				      "skill": "Apache Spark",
				      "why": "Crucial for large scale data engineering pipelines",
				      "action": "Build a PySpark ETL pipeline project on GitHub"
				    },
				    {
				      "skill": "AWS Cloud",
				      "why": "Target role requires cloud infrastructure skills",
				      "action": "Earn AWS Certified Solutions Architect Associate"
				    }
				  ]
				}
				```
				""";

		when(ollamaClient.generate(anyString(), anyString(), anyBoolean())).thenReturn(mockLlmResponse);

		SkillGapRequest request = new SkillGapRequest(
				"stu-100",
				List.of(new SkillScore("Python", 80.0), new SkillScore("SQL", 75.0)),
				"Data Engineer",
				List.of("Python", "SQL", "Apache Spark", "AWS"),
				"post-101");

		SkillGapResponse response1 = service.suggest(request);
		assertFalse(response1.cached());
		assertEquals(2, response1.improvementAreas().size());
		assertEquals("Apache Spark", response1.improvementAreas().get(0).skill());

		// Second call should hit the cache and not invoke Ollama again
		SkillGapResponse response2 = service.suggest(request);
		assertTrue(response2.cached());
		assertEquals(2, response2.improvementAreas().size());

		verify(ollamaClient, times(1)).generate(anyString(), anyString(), anyBoolean());
	}

	@Test
	void throwsAiJsonParseExceptionOnGarbageOutput() {
		when(ollamaClient.generate(anyString(), anyString(), anyBoolean()))
				.thenReturn("I'm sorry, I cannot fulfill this request.");

		SkillGapRequest request = new SkillGapRequest(
				"stu-101",
				List.of(new SkillScore("Java", 70.0)),
				"Backend Dev",
				List.of("Java", "Spring Boot"),
				null);

		assertThrows(AiJsonParseException.class, () -> service.suggest(request));
	}
}
