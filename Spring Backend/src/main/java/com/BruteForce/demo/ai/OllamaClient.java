package com.BruteForce.demo.ai;

import com.BruteForce.demo.ai.dto.OllamaChatMessage;
import com.BruteForce.demo.ai.dto.OllamaChatRequest;
import com.BruteForce.demo.ai.dto.OllamaChatResponse;
import com.BruteForce.demo.ai.dto.OllamaEmbedRequest;
import com.BruteForce.demo.ai.dto.OllamaEmbedResponse;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

/**
 * Thin HTTP wrapper around the local Ollama server ({@code http://localhost:11434}).
 * Uses {@code POST /api/chat} for generation and {@code POST /api/embed} for embeddings.
 */
@Component
public class OllamaClient {

	private static final Logger log = LoggerFactory.getLogger(OllamaClient.class);

	private final RestClient chatClient;
	private final RestClient embedClient;
	private final OllamaProperties properties;

	public OllamaClient(
			@Qualifier("ollamaChatRestClient") RestClient chatClient,
			@Qualifier("ollamaEmbedRestClient") RestClient embedClient,
			OllamaProperties properties) {
		this.chatClient = chatClient;
		this.embedClient = embedClient;
		this.properties = properties;
	}

	public String generate(String prompt) {
		return generate(null, prompt, false);
	}

	public String generate(String systemPrompt, String userPrompt) {
		return generate(systemPrompt, userPrompt, false);
	}

	/**
	 * @param jsonFormat when true, asks Ollama to constrain output with {@code format: "json"}
	 */
	public String generate(String systemPrompt, String userPrompt, boolean jsonFormat) {
		if (userPrompt == null || userPrompt.isBlank()) {
			throw new IllegalArgumentException("prompt must not be blank");
		}

		List<OllamaChatMessage> messages = new ArrayList<>();
		if (systemPrompt != null && !systemPrompt.isBlank()) {
			messages.add(new OllamaChatMessage("system", systemPrompt));
		}
		messages.add(new OllamaChatMessage("user", userPrompt));

		OllamaChatRequest request = new OllamaChatRequest(
				properties.getChatModel(), messages, false, jsonFormat ? "json" : null);

		log.debug("Ollama chat model={} jsonFormat={} prompt={}", properties.getChatModel(), jsonFormat, userPrompt);

		try {
			OllamaChatResponse response = chatClient
					.post()
					.uri("/api/chat")
					.contentType(MediaType.APPLICATION_JSON)
					.body(request)
					.retrieve()
					.body(OllamaChatResponse.class);

			if (response == null || response.message() == null || response.message().content() == null
					|| response.message().content().isBlank()) {
				log.debug("Ollama chat returned empty body: {}", response);
				throw new OllamaException();
			}

			String content = response.message().content();
			log.debug("Ollama chat raw response={}", content);
			return content;
		} catch (OllamaException e) {
			throw e;
		} catch (ResourceAccessException e) {
			log.debug("Ollama chat timed out or unreachable", e);
			throw new OllamaException(e);
		} catch (RestClientException e) {
			log.debug("Ollama chat HTTP error", e);
			throw new OllamaException(e);
		}
	}

	public List<Double> embed(String text) {
		if (text == null || text.isBlank()) {
			throw new IllegalArgumentException("text must not be blank");
		}

		OllamaEmbedRequest request = new OllamaEmbedRequest(properties.getEmbeddingModel(), text);
		log.debug("Ollama embed model={} text={}", properties.getEmbeddingModel(), text);

		try {
			OllamaEmbedResponse response = embedClient
					.post()
					.uri("/api/embed")
					.contentType(MediaType.APPLICATION_JSON)
					.body(request)
					.retrieve()
					.body(OllamaEmbedResponse.class);

			if (response == null || response.embeddings() == null || response.embeddings().isEmpty()) {
				log.debug("Ollama embed returned empty body: {}", response);
				throw new OllamaException();
			}

			List<Double> vector = response.embeddings().getFirst();
			if (vector == null || vector.isEmpty()) {
				throw new OllamaException();
			}

			log.debug("Ollama embed dimensions={}", vector.size());
			return vector;
		} catch (OllamaException e) {
			throw e;
		} catch (ResourceAccessException e) {
			log.debug("Ollama embed timed out or unreachable", e);
			throw new OllamaException(e);
		} catch (RestClientException e) {
			log.debug("Ollama embed HTTP error", e);
			throw new OllamaException(e);
		}
	}
}
