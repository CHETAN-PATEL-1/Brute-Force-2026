package com.BruteForce.demo.ai;

import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(OllamaProperties.class)
public class OllamaConfig {

	@Bean
	RestClient ollamaChatRestClient(OllamaProperties properties) {
		return restClient(properties.getBaseUrl(), properties.getConnectTimeout(), properties.getGenerateTimeout());
	}

	@Bean
	RestClient ollamaEmbedRestClient(OllamaProperties properties) {
		return restClient(properties.getBaseUrl(), properties.getConnectTimeout(), properties.getEmbedTimeout());
	}

	private static RestClient restClient(String baseUrl, Duration connectTimeout, Duration readTimeout) {
		JdkClientHttpRequestFactory factory =
				new JdkClientHttpRequestFactory(HttpClient.newBuilder().connectTimeout(connectTimeout).build());
		factory.setReadTimeout(readTimeout);
		return RestClient.builder().baseUrl(baseUrl).requestFactory(factory).build();
	}
}
