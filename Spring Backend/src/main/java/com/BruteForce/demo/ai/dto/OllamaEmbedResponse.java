package com.BruteForce.demo.ai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OllamaEmbedResponse(String model, List<List<Double>> embeddings) {
}
