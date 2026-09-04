package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.domain.JobPosting;
import com.BruteForce.demo.ai.domain.JobPostingRepository;
import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.domain.StudentProfileRepository;
import com.BruteForce.demo.ai.dto.JobPostingUpsertRequest;
import com.BruteForce.demo.ai.dto.MatchScoreBreakdown;
import com.BruteForce.demo.ai.dto.MatchingResponse;
import com.BruteForce.demo.ai.dto.StudentSkillsUpdateRequest;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MatchingAiService {

	private final StudentProfileRepository studentProfiles;
	private final JobPostingRepository jobPostings;
	private final EmbeddingRefreshService embeddingRefreshService;
	private final MatchingProperties matchingProperties;

	public MatchingAiService(
			StudentProfileRepository studentProfiles,
			JobPostingRepository jobPostings,
			EmbeddingRefreshService embeddingRefreshService,
			MatchingProperties matchingProperties) {
		this.studentProfiles = studentProfiles;
		this.jobPostings = jobPostings;
		this.embeddingRefreshService = embeddingRefreshService;
		this.matchingProperties = matchingProperties;
	}

	public StudentProfile updateStudentSkills(StudentSkillsUpdateRequest request) {
		StudentProfile profile = studentProfiles.findByStudentId(request.studentId()).orElseGet(StudentProfile::new);
		profile.setStudentId(request.studentId());
		profile.setSkills(request.skills());
		profile.setInterests(request.interests());
		StudentProfile saved = studentProfiles.save(profile);
		embeddingRefreshService.refreshStudentEmbedding(saved.getStudentId());
		return saved;
	}

	public JobPosting upsertPosting(JobPostingUpsertRequest request) {
		JobPosting posting = jobPostings.findByPostingId(request.postingId()).orElseGet(JobPosting::new);
		posting.setPostingId(request.postingId());
		posting.setTitle(request.title());
		posting.setType(request.type() == null || request.type().isBlank() ? "internship" : request.type());
		posting.setStatus(request.status() == null || request.status().isBlank() ? "open" : request.status());
		posting.setSkills(request.skills());
		posting.setInterests(request.interests());
		JobPosting saved = jobPostings.save(posting);
		embeddingRefreshService.refreshPostingEmbedding(saved.getPostingId());
		return saved;
	}

	public MatchingResponse match(String studentId) {
		StudentProfile profile = studentProfiles
				.findByStudentId(studentId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student profile not found"));

		double semanticWeight = matchingProperties.getSemanticWeight();
		double keywordWeight = matchingProperties.getKeywordWeight();
		List<MatchScoreBreakdown> matches = jobPostings.findAll().stream()
				.filter(JobPosting::isOpen)
				.map(posting -> score(profile, posting, semanticWeight, keywordWeight))
				.sorted(Comparator.comparingDouble(MatchScoreBreakdown::finalScore).reversed())
				.toList();
		return new MatchingResponse(studentId, matches);
	}

	static MatchScoreBreakdown score(
			StudentProfile profile, JobPosting posting, double semanticWeight, double keywordWeight) {
		double keyword = KeywordOverlap.jaccard(profile.getSkills(), posting.getSkills());
		boolean canEmbed = hasEmbedding(profile.getSkillEmbedding()) && hasEmbedding(posting.getSkillEmbedding())
				&& profile.getSkillEmbedding().size() == posting.getSkillEmbedding().size();
		Double semantic = canEmbed ? CosineSimilarity.cosineSimilarity(profile.getSkillEmbedding(), posting.getSkillEmbedding())
				: null;
		double finalScore = semantic == null ? keyword : (semanticWeight * semantic) + (keywordWeight * keyword);
		return new MatchScoreBreakdown(
				posting.getPostingId(),
				posting.getTitle(),
				posting.getType(),
				round4(finalScore),
				semantic == null ? null : round4(semantic),
				round4(keyword),
				semanticWeight,
				keywordWeight,
				KeywordOverlap.matched(profile.getSkills(), posting.getSkills()),
				KeywordOverlap.missing(profile.getSkills(), posting.getSkills()),
				canEmbed);
	}

	private static boolean hasEmbedding(List<Double> vector) {
		return vector != null && !vector.isEmpty();
	}

	private static double round4(double value) {
		return Math.round(value * 10_000.0) / 10_000.0;
	}
}
