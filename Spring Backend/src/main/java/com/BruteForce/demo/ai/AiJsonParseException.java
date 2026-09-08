package com.BruteForce.demo.ai;

/** Model returned text that could not be parsed as the expected JSON object. */
public class AiJsonParseException extends RuntimeException {

	public static final String USER_MESSAGE = "Could not parse AI suggestions, try again";

	public AiJsonParseException() {
		super(USER_MESSAGE);
	}

	public AiJsonParseException(String message) {
		super(message);
	}

	public AiJsonParseException(String message, Throwable cause) {
		super(message, cause);
	}
}
