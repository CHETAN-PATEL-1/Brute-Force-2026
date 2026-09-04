package com.BruteForce.demo.ai.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record OllamaChatRequest(
		String model,
		List<OllamaChatMessage> messages,
		boolean stream,
		String format) {
}
