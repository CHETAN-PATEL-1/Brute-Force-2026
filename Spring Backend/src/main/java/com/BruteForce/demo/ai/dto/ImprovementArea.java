package com.BruteForce.demo.ai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ImprovementArea(String skill, String why, String action) {
}
