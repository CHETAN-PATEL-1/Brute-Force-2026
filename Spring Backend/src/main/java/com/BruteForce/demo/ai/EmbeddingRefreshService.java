package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.domain.JobPosting;
import com.BruteForce.demo.ai.domain.JobPostingRepository;
import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.domain.StudentProfileRepository;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmbeddingRefreshService {

	private static final Logger log = LoggerFactory.getLogger(EmbeddingRefreshService.class);

	private final OllamaClient ollamaClient;
	private final StudentProfileRepository studentProfiles;
	private final JobPostingRepository jobPostings;

	public EmbeddingRefreshService(
			OllamaClient ollamaClient,
			StudentProfileRepository studentProfiles,
			JobPostingRepository jobPostings) {
		this.ollamaClient = ollamaClient;
		this.studentProfiles = studentProfiles;
		this.jobPostings = jobPostings;
	}

	@Async("embeddingExecutor")
	public void refreshStudentEmbedding(String studentId) {
		try {
			StudentProfile profile = studentProfiles.findByStudentId(studentId).orElse(null);
			if (profile == null) {
				return;
			}
			String text = EmbeddingText.forStudent(profile.getSkills(), profile.getInterests());
			String hash = EmbeddingText.sha256(EmbeddingText.normalizeHashSource(text));
			if (hash.equals(profile.getEmbeddingSourceHash())
					&& profile.getSkillEmbedding() != null
					&& !profile.getSkillEmbedding().isEmpty()) {
				return;
			}
			List<Double> vector = ollamaClient.embed(text);
			profile.setSkillEmbedding(vector);
			profile.setEmbeddingSourceHash(hash);
			profile.setEmbeddingUpdatedAt(Instant.now());
			studentProfiles.save(profile);
			log.debug("Updated student embedding studentId={} dims={}", studentId, vector.size());
		} catch (OllamaException e) {
			log.debug("Student embedding refresh failed for {}", studentId, e);
		}
	}

	@Async("embeddingExecutor")
	public void refreshPostingEmbedding(String postingId) {
		try {
			JobPosting posting = jobPostings.findByPostingId(postingId).orElse(null);
			if (posting == null) {
				return;
			}
			String text = EmbeddingText.forPosting(posting.getTitle(), posting.getSkills(), posting.getInterests());
			String hash = EmbeddingText.sha256(EmbeddingText.normalizeHashSource(text));
			if (hash.equals(posting.getEmbeddingSourceHash())
					&& posting.getSkillEmbedding() != null
					&& !posting.getSkillEmbedding().isEmpty()) {
				return;
			}
			List<Double> vector = ollamaClient.embed(text);
			posting.setSkillEmbedding(vector);
			posting.setEmbeddingSourceHash(hash);
			posting.setEmbeddingUpdatedAt(Instant.now());
			jobPostings.save(posting);
			log.debug("Updated posting embedding postingId={} dims={}", postingId, vector.size());
		} catch (OllamaException e) {
			log.debug("Posting embedding refresh failed for {}", postingId, e);
		}
	}
}
