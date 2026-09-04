package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.dto.SkillGapRequest;
import com.BruteForce.demo.ai.dto.SkillGapResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

	private final SkillGapAiService skillGapAiService;

	public AiController(SkillGapAiService skillGapAiService) {
		this.skillGapAiService = skillGapAiService;
	}

	@PostMapping("/skill-gap")
	@PreAuthorize("hasRole('STUDENT')")
	public SkillGapResponse skillGap(@Valid @RequestBody SkillGapRequest request) {
		return skillGapAiService.suggest(request);
	}
}
