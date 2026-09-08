package com.BruteForce.demo.ai.dto;

import java.util.List;

public record ResumeExtractResponse(
		List<ExtractedSkill> skills,
		int totalSkills) {

	public static ResumeExtractResponse of(List<ExtractedSkill> skills) {
		List<ExtractedSkill> safe = skills == null ? List.of() : skills;
		return new ResumeExtractResponse(safe, safe.size());
	}
}
