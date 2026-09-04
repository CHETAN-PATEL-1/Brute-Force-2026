package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.domain.JobPosting;
import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.dto.JobPostingUpsertRequest;
import com.BruteForce.demo.ai.dto.MatchingResponse;
import com.BruteForce.demo.ai.dto.StudentSkillsUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

	private final MatchingAiService matchingAiService;

	public MatchingController(MatchingAiService matchingAiService) {
		this.matchingAiService = matchingAiService;
	}

	@PostMapping("/students/skills")
	@PreAuthorize("hasRole('STUDENT')")
	public StudentProfile updateSkills(@Valid @RequestBody StudentSkillsUpdateRequest request) {
		return matchingAiService.updateStudentSkills(request);
	}

	@PostMapping("/postings")
	@PreAuthorize("hasAnyRole('STUDENT', 'INDUSTRY')")
	public JobPosting upsertPosting(@Valid @RequestBody JobPostingUpsertRequest request) {
		return matchingAiService.upsertPosting(request);
	}

	@GetMapping
	@PreAuthorize("hasAnyRole('STUDENT', 'INDUSTRY')")
	public MatchingResponse match(@RequestParam String studentId) {
		return matchingAiService.match(studentId);
	}
}
