package com.BruteForce.demo.ai.domain;

import com.BruteForce.demo.ai.dto.ImprovementArea;
import java.time.Instant;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_profiles")
public class StudentProfile {

	@Id
	private String id;

	@Indexed(unique = true)
	private String studentId;

	private String skillGapCacheKey;
	private List<ImprovementArea> skillGapSuggestions;
	private Instant skillGapGeneratedAt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getSkillGapCacheKey() {
		return skillGapCacheKey;
	}

	public void setSkillGapCacheKey(String skillGapCacheKey) {
		this.skillGapCacheKey = skillGapCacheKey;
	}

	public List<ImprovementArea> getSkillGapSuggestions() {
		return skillGapSuggestions;
	}

	public void setSkillGapSuggestions(List<ImprovementArea> skillGapSuggestions) {
		this.skillGapSuggestions = skillGapSuggestions;
	}

	public Instant getSkillGapGeneratedAt() {
		return skillGapGeneratedAt;
	}

	public void setSkillGapGeneratedAt(Instant skillGapGeneratedAt) {
		this.skillGapGeneratedAt = skillGapGeneratedAt;
	}
}
