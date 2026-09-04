package com.BruteForce.demo.ai.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "job_postings")
public class JobPosting {

	@Id
	private String id;

	@Indexed(unique = true)
	private String postingId;

	private String title;
	private String type;
	private String status;
	private List<String> skills = new ArrayList<>();
	private List<String> interests = new ArrayList<>();
	private List<Double> skillEmbedding = new ArrayList<>();
	private String embeddingSourceHash;
	private Instant embeddingUpdatedAt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPostingId() {
		return postingId;
	}

	public void setPostingId(String postingId) {
		this.postingId = postingId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills == null ? new ArrayList<>() : skills;
	}

	public List<String> getInterests() {
		return interests;
	}

	public void setInterests(List<String> interests) {
		this.interests = interests == null ? new ArrayList<>() : interests;
	}

	public List<Double> getSkillEmbedding() {
		return skillEmbedding;
	}

	public void setSkillEmbedding(List<Double> skillEmbedding) {
		this.skillEmbedding = skillEmbedding == null ? new ArrayList<>() : skillEmbedding;
	}

	public String getEmbeddingSourceHash() {
		return embeddingSourceHash;
	}

	public void setEmbeddingSourceHash(String embeddingSourceHash) {
		this.embeddingSourceHash = embeddingSourceHash;
	}

	public Instant getEmbeddingUpdatedAt() {
		return embeddingUpdatedAt;
	}

	public void setEmbeddingUpdatedAt(Instant embeddingUpdatedAt) {
		this.embeddingUpdatedAt = embeddingUpdatedAt;
	}

	public boolean isOpen() {
		if (status == null || status.isBlank()) {
			return true;
		}
		String normalized = status.trim().toLowerCase();
		return "open".equals(normalized) || "active".equals(normalized);
	}
}
