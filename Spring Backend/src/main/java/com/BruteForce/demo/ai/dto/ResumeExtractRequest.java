package com.BruteForce.demo.ai.dto;

import jakarta.validation.constraints.NotBlank;

public record ResumeExtractRequest(
		@NotBlank(message = "resumeText must not be blank")
		String resumeText) {
}
