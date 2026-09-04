package com.BruteForce.demo.ai;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

/**
 * Pulls the first JSON object out of model text that may include prose or markdown fences.
 */
public final class JsonExtractor {

	private JsonExtractor() {}

	public static <T> T parseObject(String raw, Class<T> type, ObjectMapper mapper) {
		if (raw == null || raw.isBlank()) {
			throw new AiJsonParseException();
		}

		String json = firstObjectLiteral(stripFences(raw.trim()));
		if (json == null) {
			throw new AiJsonParseException();
		}

		try {
			JsonNode node = mapper.readTree(json);
			if (node == null || !node.isObject()) {
				throw new AiJsonParseException();
			}
			return mapper.treeToValue(node, type);
		} catch (AiJsonParseException e) {
			throw e;
		} catch (JacksonException e) {
			throw new AiJsonParseException(AiJsonParseException.USER_MESSAGE, e);
		}
	}

	static String stripFences(String raw) {
		String s = raw.trim();
		if (s.startsWith("```")) {
			int firstNl = s.indexOf('\n');
			if (firstNl > 0) {
				s = s.substring(firstNl + 1);
			}
			int fence = s.lastIndexOf("```");
			if (fence >= 0) {
				s = s.substring(0, fence);
			}
		}
		return s.trim();
	}

	static String firstObjectLiteral(String text) {
		int start = text.indexOf('{');
		if (start < 0) {
			return null;
		}

		int depth = 0;
		boolean inString = false;
		boolean escape = false;
		for (int i = start; i < text.length(); i++) {
			char c = text.charAt(i);
			if (inString) {
				if (escape) {
					escape = false;
				} else if (c == '\\') {
					escape = true;
				} else if (c == '"') {
					inString = false;
				}
				continue;
			}
			if (c == '"') {
				inString = true;
			} else if (c == '{') {
				depth++;
			} else if (c == '}') {
				depth--;
				if (depth == 0) {
					return text.substring(start, i + 1);
				}
			}
		}
		return null;
	}
}
