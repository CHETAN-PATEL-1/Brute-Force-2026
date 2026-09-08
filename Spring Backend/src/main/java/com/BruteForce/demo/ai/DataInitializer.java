package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.domain.JobPosting;
import com.BruteForce.demo.ai.domain.JobPostingRepository;
import com.BruteForce.demo.ai.domain.StudentProfile;
import com.BruteForce.demo.ai.domain.StudentProfileRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Seeds initial sample data into MongoDB (database: skill_genz)
 * so that AI matching and recommendations work immediately.
 */
@Component
public class DataInitializer implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

	private final JobPostingRepository jobPostingRepository;
	private final StudentProfileRepository studentProfileRepository;
	private final EmbeddingRefreshService embeddingRefreshService;

	public DataInitializer(
			JobPostingRepository jobPostingRepository,
			StudentProfileRepository studentProfileRepository,
			EmbeddingRefreshService embeddingRefreshService) {
		this.jobPostingRepository = jobPostingRepository;
		this.studentProfileRepository = studentProfileRepository;
		this.embeddingRefreshService = embeddingRefreshService;
	}

	@Override
	public void run(String... args) {
		try {
			seedJobPostings();
			seedStudentProfile();
		} catch (Exception e) {
			log.warn("DataInitializer skipped seeding (MongoDB might be unavailable in test/offline environment): {}", e.getMessage());
		}
	}

	private void seedJobPostings() {
		if (jobPostingRepository.count() > 0) {
			return;
		}

		log.info("Seeding initial JobPostings in MongoDB skill_genz database...");

		JobPosting p1 = new JobPosting();
		p1.setPostingId("post-001");
		p1.setTitle("Data Analytics Intern");
		p1.setType("internship");
		p1.setStatus("open");
		p1.setSkills(List.of("Python", "SQL", "Data Analysis", "Tableau"));
		p1.setInterests(List.of("data science", "analytics", "healthcare tech"));
		jobPostingRepository.save(p1);
		embeddingRefreshService.refreshPostingEmbedding(p1.getPostingId());

		JobPosting p2 = new JobPosting();
		p2.setPostingId("post-002");
		p2.setTitle("Full Stack Developer Intern");
		p2.setType("internship");
		p2.setStatus("open");
		p2.setSkills(List.of("React", "Node.js", "MongoDB", "JavaScript"));
		p2.setInterests(List.of("web development", "full stack"));
		jobPostingRepository.save(p2);
		embeddingRefreshService.refreshPostingEmbedding(p2.getPostingId());

		JobPosting p3 = new JobPosting();
		p3.setPostingId("post-003");
		p3.setTitle("AI & Machine Learning Research Intern");
		p3.setType("internship");
		p3.setStatus("open");
		p3.setSkills(List.of("Python", "Machine Learning", "PyTorch", "NLP"));
		p3.setInterests(List.of("artificial intelligence", "deep learning"));
		jobPostingRepository.save(p3);
		embeddingRefreshService.refreshPostingEmbedding(p3.getPostingId());

		JobPosting p4 = new JobPosting();
		p4.setPostingId("post-004");
		p4.setTitle("Cloud & DevOps Engineering Intern");
		p4.setType("internship");
		p4.setStatus("open");
		p4.setSkills(List.of("AWS", "Docker", "Linux", "CI/CD"));
		p4.setInterests(List.of("cloud computing", "devops", "infrastructure"));
		jobPostingRepository.save(p4);
		embeddingRefreshService.refreshPostingEmbedding(p4.getPostingId());

		log.info("Seeded 4 initial JobPostings.");
	}

	private void seedStudentProfile() {
		if (studentProfileRepository.findByStudentId("stu-001").isPresent()) {
			return;
		}

		log.info("Seeding default StudentProfile for stu-001 in MongoDB...");
		StudentProfile profile = new StudentProfile();
		profile.setStudentId("stu-001");
		profile.setSkills(List.of("Python", "Data Analysis", "SQL", "React"));
		profile.setInterests(List.of("web development", "backend systems", "data analytics"));
		studentProfileRepository.save(profile);
		embeddingRefreshService.refreshStudentEmbedding(profile.getStudentId());

		log.info("Seeded default StudentProfile for stu-001.");
	}
}
