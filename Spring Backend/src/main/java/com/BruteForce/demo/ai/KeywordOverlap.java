package com.BruteForce.demo.ai;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

final class KeywordOverlap {

	private KeywordOverlap() {}

	static double jaccard(Collection<String> studentSkills, Collection<String> postingSkills) {
		Set<String> a = tokens(studentSkills);
		Set<String> b = tokens(postingSkills);
		if (a.isEmpty() && b.isEmpty()) {
			return 0.0;
		}
		Set<String> intersection = a.stream().filter(b::contains).collect(Collectors.toCollection(LinkedHashSet::new));
		Set<String> union = new LinkedHashSet<>(a);
		union.addAll(b);
		if (union.isEmpty()) {
			return 0.0;
		}
		return (double) intersection.size() / union.size();
	}

	static List<String> matched(Collection<String> studentSkills, Collection<String> postingSkills) {
		Set<String> studentTokens = tokens(studentSkills);
		if (postingSkills == null) {
			return List.of();
		}
		return postingSkills.stream()
				.filter(skill -> skill != null && !skill.isBlank())
				.filter(skill -> tokens(List.of(skill)).stream().anyMatch(studentTokens::contains))
				.toList();
	}

	static List<String> missing(Collection<String> studentSkills, Collection<String> postingSkills) {
		Set<String> studentTokens = tokens(studentSkills);
		if (postingSkills == null) {
			return List.of();
		}
		return postingSkills.stream()
				.filter(skill -> skill != null && !skill.isBlank())
				.filter(skill -> tokens(List.of(skill)).stream().noneMatch(studentTokens::contains))
				.toList();
	}

	static Set<String> tokens(Collection<String> skills) {
		Set<String> out = new LinkedHashSet<>();
		if (skills == null) {
			return out;
		}
		for (String skill : skills) {
			if (skill == null || skill.isBlank()) {
				continue;
			}
			for (String part : skill.toLowerCase(Locale.ROOT).split("[^a-z0-9]+")) {
				if (part.length() > 1) {
					out.add(part);
				}
			}
		}
		return out;
	}
}
