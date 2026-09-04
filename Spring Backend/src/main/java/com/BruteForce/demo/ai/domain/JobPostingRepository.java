package com.BruteForce.demo.ai.domain;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobPostingRepository extends MongoRepository<JobPosting, String> {

	Optional<JobPosting> findByPostingId(String postingId);
}
