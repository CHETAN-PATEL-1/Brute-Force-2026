package com.BruteForce.demo.ai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ExtractedSkill(
		String skill,
		String proficiency,
		String category) {
}
