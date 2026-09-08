package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.dto.PortfolioBioRequest;
import com.BruteForce.demo.ai.dto.PortfolioBioResponse;
import com.BruteForce.demo.ai.dto.ResumeExtractRequest;
import com.BruteForce.demo.ai.dto.ResumeExtractResponse;
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
	private final ResumeParsingAiService resumeParsingAiService;
	private final PortfolioAiService portfolioAiService;

	public AiController(
			SkillGapAiService skillGapAiService,
			ResumeParsingAiService resumeParsingAiService,
			PortfolioAiService portfolioAiService) {
		this.skillGapAiService = skillGapAiService;
		this.resumeParsingAiService = resumeParsingAiService;
		this.portfolioAiService = portfolioAiService;
	}

	@PostMapping("/skill-gap")
	@PreAuthorize("hasRole('STUDENT')")
	public SkillGapResponse skillGap(@Valid @RequestBody SkillGapRequest request) {
		return skillGapAiService.suggest(request);
	}

	@PostMapping("/extract-skills")
	@PreAuthorize("hasRole('STUDENT')")
	public ResumeExtractResponse extractSkills(@Valid @RequestBody ResumeExtractRequest request) {
		return resumeParsingAiService.extractSkills(request);
	}

	@PostMapping("/generate-bio")
	@PreAuthorize("hasRole('STUDENT')")
	public PortfolioBioResponse generateBio(@Valid @RequestBody PortfolioBioRequest request) {
		return portfolioAiService.generateBio(request);
	}
}
