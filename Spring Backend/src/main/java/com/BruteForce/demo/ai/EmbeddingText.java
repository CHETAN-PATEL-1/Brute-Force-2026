package com.BruteForce.demo.ai;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

final class EmbeddingText {

	private EmbeddingText() {}

	static String forStudent(List<String> skills, List<String> interests) {
		return "Skills: " + join(skills) + ". Interests: " + join(interests) + ".";
	}

	static String forPosting(String title, List<String> skills, List<String> interests) {
		return "Title: " + nullToEmpty(title) + ". Skills: " + join(skills) + ". Interests: " + join(interests)
				+ ".";
	}

	static String sha256(String text) {
		try {
			byte[] digest = MessageDigest.getInstance("SHA-256").digest(text.getBytes(StandardCharsets.UTF_8));
			return HexFormat.of().formatHex(digest);
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException(e);
		}
	}

	private static String join(List<String> values) {
		if (values == null || values.isEmpty()) {
			return "(none)";
		}
		return values.stream()
				.filter(v -> v != null && !v.isBlank())
				.map(v -> v.trim())
				.collect(Collectors.joining(", "));
	}

	private static String nullToEmpty(String value) {
		return value == null ? "" : value.trim();
	}

	static String normalizeHashSource(String text) {
		return text == null ? "" : text.trim().toLowerCase(Locale.ROOT);
	}
}
