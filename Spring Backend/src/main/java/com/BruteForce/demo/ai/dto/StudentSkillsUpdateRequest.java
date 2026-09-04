package com.BruteForce.demo.ai.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record StudentSkillsUpdateRequest(
		@NotBlank String studentId, List<String> skills, List<String> interests) {
}
