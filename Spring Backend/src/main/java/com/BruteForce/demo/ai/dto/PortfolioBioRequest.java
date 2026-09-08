package com.BruteForce.demo.ai.dto;

import java.util.List;

public record PortfolioBioRequest(
		String studentName,
		String targetRole,
		List<String> skills,
		List<String> projects,
		List<String> certifications,
		List<String> achievements) {
}
