package com.BruteForce.demo.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SkillScore(@NotBlank String skill, @NotNull Double level) {
}
