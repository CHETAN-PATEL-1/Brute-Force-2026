package com.BruteForce.demo.ai.dto;

import java.util.List;

public record MatchScoreBreakdown(
		String postingId,
		String title,
		String type,
		double finalScore,
		Double semanticSimilarity,
		double keywordOverlap,
		double semanticWeight,
		double keywordWeight,
		List<String> matchedSkills,
		List<String> missingSkills,
		boolean embeddingUsed) {
}
