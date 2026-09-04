package com.BruteForce.demo.ai.dto;

import java.util.List;

public record SkillGapResponse(List<ImprovementArea> improvementAreas, boolean cached) {

	public SkillGapResponse withCached(boolean cachedFlag) {
		return new SkillGapResponse(improvementAreas, cachedFlag);
	}
}
