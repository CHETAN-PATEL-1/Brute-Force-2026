package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.BruteForce.demo.ai.dto.ResumeExtractRequest;
import com.BruteForce.demo.ai.dto.ResumeExtractResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

class ResumeParsingAiServiceTest {

	private OllamaClient ollamaClient;
	private ResumeParsingAiService service;

	@BeforeEach
	void setUp() {
		ollamaClient = mock(OllamaClient.class);
		ObjectMapper mapper = new JsonMapper();
		service = new ResumeParsingAiService(ollamaClient, mapper);
	}

	@Test
	void extractsSkillsSuccessfully() {
		String mockOutput = """
				{
				  "skills": [
				    { "skill": "Java", "proficiency": "Advanced", "category": "Programming Language" },
				    { "skill": "React", "proficiency": "Intermediate", "category": "Frontend Framework" },
				    { "skill": "Docker", "proficiency": "Beginner", "category": "DevOps" }
				  ]
				}
				""";

		when(ollamaClient.generate(anyString(), anyString(), anyBoolean())).thenReturn(mockOutput);

		ResumeExtractRequest request = new ResumeExtractRequest(
				"Experienced Java developer with 3 years building Spring Boot services. Built React frontend for portals. Basic Docker knowledge.");

		ResumeExtractResponse response = service.extractSkills(request);
		assertNotNull(response);
		assertEquals(3, response.totalSkills());
		assertEquals("Java", response.skills().get(0).skill());
		assertEquals("Advanced", response.skills().get(0).proficiency());
		assertEquals("Programming Language", response.skills().get(0).category());
	}

	@Test
	void throwsAiJsonParseExceptionOnEmptyOrInvalidJson() {
		when(ollamaClient.generate(anyString(), anyString(), anyBoolean())).thenReturn("invalid output");

		ResumeExtractRequest request = new ResumeExtractRequest("Some resume text");
		assertThrows(AiJsonParseException.class, () -> service.extractSkills(request));
	}
}
