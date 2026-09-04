package com.BruteForce.demo.ai;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "ollama")
public class OllamaProperties {

	private String baseUrl = "http://localhost:11434";
	private String chatModel = "llama3.2:3b";
	private String embeddingModel = "nomic-embed-text";
	private Duration connectTimeout = Duration.ofSeconds(5);
	private Duration generateTimeout = Duration.ofSeconds(60);
	private Duration embedTimeout = Duration.ofSeconds(15);

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}

	public String getChatModel() {
		return chatModel;
	}

	public void setChatModel(String chatModel) {
		this.chatModel = chatModel;
	}

	public String getEmbeddingModel() {
		return embeddingModel;
	}

	public void setEmbeddingModel(String embeddingModel) {
		this.embeddingModel = embeddingModel;
	}

	public Duration getConnectTimeout() {
		return connectTimeout;
	}

	public void setConnectTimeout(Duration connectTimeout) {
		this.connectTimeout = connectTimeout;
	}

	public Duration getGenerateTimeout() {
		return generateTimeout;
	}

	public void setGenerateTimeout(Duration generateTimeout) {
		this.generateTimeout = generateTimeout;
	}

	public Duration getEmbedTimeout() {
		return embedTimeout;
	}

	public void setEmbedTimeout(Duration embedTimeout) {
		this.embedTimeout = embedTimeout;
	}
}
