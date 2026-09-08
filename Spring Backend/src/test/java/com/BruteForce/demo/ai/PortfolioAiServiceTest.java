package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.BruteForce.demo.ai.dto.PortfolioBioRequest;
import com.BruteForce.demo.ai.dto.PortfolioBioResponse;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PortfolioAiServiceTest {

	private OllamaClient ollamaClient;
	private PortfolioAiService service;

	@BeforeEach
	void setUp() {
		ollamaClient = mock(OllamaClient.class);
		service = new PortfolioAiService(ollamaClient);
	}

	@Test
	void generatesCleanBio() {
		String mockBio = """
				"A passionate full-stack developer with proven skills in Java, React, and Spring Boot.
				Successfully built an Academia-Industry collaboration portal and real-time analytics dashboard.
				Holds AWS Cloud Practitioner certification and eager to contribute to innovative tech solutions."
				""";

		when(ollamaClient.generate(anyString(), anyString(), anyBoolean())).thenReturn(mockBio);

		PortfolioBioRequest request = new PortfolioBioRequest(
				"Rahul Sharma",
				"Full Stack Developer",
				List.of("Java", "React", "Spring Boot"),
				List.of("Academia Portal", "Analytics Dashboard"),
				List.of("AWS Certified Cloud Practitioner"),
				List.of("Hackathon 1st Runner Up"));

		PortfolioBioResponse response = service.generateBio(request);
		assertNotNull(response);
		assertNotNull(response.bio());
		// Verify surrounding quotes were stripped cleanly
		assertEquals(
				"A passionate full-stack developer with proven skills in Java, React, and Spring Boot.\n"
						+ "Successfully built an Academia-Industry collaboration portal and real-time analytics dashboard.\n"
						+ "Holds AWS Cloud Practitioner certification and eager to contribute to innovative tech solutions.",
				response.bio());
	}
}
