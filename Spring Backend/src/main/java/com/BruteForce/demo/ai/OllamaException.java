package com.BruteForce.demo.ai;

/**
 * Thrown when the local Ollama server is unreachable, times out, or returns an unusable response.
 * {@link #getMessage()} is safe to show in the frontend.
 */
public class OllamaException extends RuntimeException {

	public static final String USER_MESSAGE =
			"AI suggestions are taking longer than usual, try again";

	public OllamaException() {
		super(USER_MESSAGE);
	}

	public OllamaException(String message) {
		super(message);
	}

	public OllamaException(String message, Throwable cause) {
		super(message, cause);
	}

	public OllamaException(Throwable cause) {
		super(USER_MESSAGE, cause);
	}
}
