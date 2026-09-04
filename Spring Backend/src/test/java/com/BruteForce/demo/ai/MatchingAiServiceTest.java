package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.BruteForce.demo.ai.domain.JobPosting;
import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.dto.MatchScoreBreakdown;
import java.util.List;
import org.junit.jupiter.api.Test;

class MatchingAiServiceTest {

	@Test
	void blendsSemanticAndKeywordWhenEmbeddingsPresent() {
		StudentProfile student = new StudentProfile();
		student.setSkills(List.of("Python", "SQL"));
		student.setSkillEmbedding(List.of(1.0, 0.0));

		JobPosting posting = new JobPosting();
		posting.setPostingId("post-001");
		posting.setTitle("Data Intern");
		posting.setType("internship");
		posting.setSkills(List.of("Python", "SQL"));
		posting.setSkillEmbedding(List.of(1.0, 0.0));

		MatchScoreBreakdown score = MatchingAiService.score(student, posting, 0.6, 0.4);
		assertEquals(1.0, score.semanticSimilarity(), 1e-9);
		assertEquals(1.0, score.keywordOverlap(), 1e-9);
		assertEquals(1.0, score.finalScore(), 1e-9);
		assertTrue(score.embeddingUsed());
	}

	@Test
	void fallsBackToKeywordWhenEmbeddingMissing() {
		StudentProfile student = new StudentProfile();
		student.setSkills(List.of("Python"));

		JobPosting posting = new JobPosting();
		posting.setPostingId("post-002");
		posting.setTitle("Python Intern");
		posting.setSkills(List.of("Python", "Spark"));

		MatchScoreBreakdown score = MatchingAiService.score(student, posting, 0.6, 0.4);
		assertEquals(null, score.semanticSimilarity());
		assertEquals(score.keywordOverlap(), score.finalScore(), 1e-9);
	}
}
