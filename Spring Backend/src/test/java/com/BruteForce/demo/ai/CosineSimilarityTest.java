package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CosineSimilarityTest {

	@Test
	void identicalVectorsAreOne() {
		assertEquals(1.0, CosineSimilarity.cosineSimilarity(new double[] {1, 2, 3}, new double[] {1, 2, 3}), 1e-9);
	}

	@Test
	void orthogonalVectorsAreZero() {
		assertEquals(0.0, CosineSimilarity.cosineSimilarity(new double[] {1, 0}, new double[] {0, 1}), 1e-9);
	}

	@Test
	void lengthMismatchIsZero() {
		assertEquals(0.0, CosineSimilarity.cosineSimilarity(new double[] {1, 2}, new double[] {1, 2, 3}), 1e-9);
	}
}
