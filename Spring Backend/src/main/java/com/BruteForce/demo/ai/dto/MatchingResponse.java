package com.BruteForce.demo.ai.dto;

import java.util.List;

public record MatchingResponse(String studentId, List<MatchScoreBreakdown> matches) {
}
