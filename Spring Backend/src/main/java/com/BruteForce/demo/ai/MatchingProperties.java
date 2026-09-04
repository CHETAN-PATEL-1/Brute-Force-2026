package com.BruteForce.demo.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "matching")
public class MatchingProperties {

	private double semanticWeight = 0.6;
	private double keywordWeight = 0.4;

	public double getSemanticWeight() {
		return semanticWeight;
	}

	public void setSemanticWeight(double semanticWeight) {
		this.semanticWeight = semanticWeight;
	}

	public double getKeywordWeight() {
		return keywordWeight;
	}

	public void setKeywordWeight(double keywordWeight) {
		this.keywordWeight = keywordWeight;
	}
}
