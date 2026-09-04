package com.BruteForce.demo.ai.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record JobPostingUpsertRequest(
		@NotBlank String postingId,
		@NotBlank String title,
		String type,
		String status,
		List<String> skills,
		List<String> interests) {
}
