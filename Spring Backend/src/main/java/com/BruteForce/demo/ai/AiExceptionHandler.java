package com.BruteForce.demo.ai;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = AiController.class)
public class AiExceptionHandler {

	@ExceptionHandler(OllamaException.class)
	public ResponseEntity<Map<String, String>> ollama(OllamaException ex) {
		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
				.body(Map.of("error", ex.getMessage()));
	}

	@ExceptionHandler(AiJsonParseException.class)
	public ResponseEntity<Map<String, String>> parse(AiJsonParseException ex) {
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("error", ex.getMessage()));
	}
}
