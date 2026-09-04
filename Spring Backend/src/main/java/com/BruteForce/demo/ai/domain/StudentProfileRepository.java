package com.BruteForce.demo.ai.domain;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {

	Optional<StudentProfile> findByStudentId(String studentId);
}
