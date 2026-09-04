package com.BruteForce.demo.ai;

import java.util.List;

/** Cosine similarity for stored Ollama embedding vectors. No extra libraries. */
public final class CosineSimilarity {

	private CosineSimilarity() {}

	public static double cosineSimilarity(double[] a, double[] b) {
		if (a == null || b == null || a.length == 0 || a.length != b.length) {
			return 0.0;
		}
		double dot = 0.0;
		double normA = 0.0;
		double normB = 0.0;
		for (int i = 0; i < a.length; i++) {
			dot += a[i] * b[i];
			normA += a[i] * a[i];
			normB += b[i] * b[i];
		}
		if (normA == 0.0 || normB == 0.0) {
			return 0.0;
		}
		return dot / (Math.sqrt(normA) * Math.sqrt(normB));
	}

	public static double cosineSimilarity(List<Double> a, List<Double> b) {
		if (a == null || b == null || a.isEmpty() || a.size() != b.size()) {
			return 0.0;
		}
		double[] left = new double[a.size()];
		double[] right = new double[b.size()];
		for (int i = 0; i < a.size(); i++) {
			left[i] = a.get(i) == null ? 0.0 : a.get(i);
			right[i] = b.get(i) == null ? 0.0 : b.get(i);
		}
		return cosineSimilarity(left, right);
	}
}
