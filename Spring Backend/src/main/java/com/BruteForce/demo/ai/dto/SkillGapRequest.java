package com.BruteForce.demo.ai.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * Assessment scores plus a target posting or career interest. {@code studentId} is used for cache keys
 * until JWT identity is wired from the core auth service.
 */
public record SkillGapRequest(
		@NotBlank String studentId,
		@NotEmpty @Valid List<SkillScore> currentSkills,
		@NotBlank String targetRole,
		List<String> targetRequirements,
		String postingId) {
}
