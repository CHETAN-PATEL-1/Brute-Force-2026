package com.BruteForce.demo.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.Duration;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.client.match.MockRestRequestMatchers;
import org.springframework.test.web.client.response.MockRestResponseCreators;
import org.springframework.web.client.RestClient;

class OllamaClientTest {

	private MockRestServiceServer chatServer;
	private MockRestServiceServer embedServer;
	private OllamaClient client;

	@BeforeEach
	void setUp() {
		RestClient.Builder chatBuilder = RestClient.builder().baseUrl("http://localhost:11434");
		chatServer = MockRestServiceServer.bindTo(chatBuilder).build();
		RestClient chatClient = chatBuilder.build();

		RestClient.Builder embedBuilder = RestClient.builder().baseUrl("http://localhost:11434");
		embedServer = MockRestServiceServer.bindTo(embedBuilder).build();
		RestClient embedClient = embedBuilder.build();

		OllamaProperties props = new OllamaProperties();
		props.setBaseUrl("http://localhost:11434");
		props.setChatModel("llama3.2:3b");
		props.setEmbeddingModel("nomic-embed-text");
		props.setConnectTimeout(Duration.ofSeconds(5));
		props.setGenerateTimeout(Duration.ofSeconds(60));
		props.setEmbedTimeout(Duration.ofSeconds(15));

		client = new OllamaClient(chatClient, embedClient, props);
	}

	@Test
	void generateReturnsAssistantMessage() {
		String responseJson = """
				{
				  "model": "llama3.2:3b",
				  "message": {
				    "role": "assistant",
				    "content": "Hello there!"
				  },
				  "done": true
				}
				""";

		chatServer.expect(MockRestRequestMatchers.requestTo("http://localhost:11434/api/chat"))
				.andExpect(MockRestRequestMatchers.method(HttpMethod.POST))
				.andRespond(MockRestResponseCreators.withSuccess(responseJson, MediaType.APPLICATION_JSON));

		String result = client.generate("Say hello");
		assertEquals("Hello there!", result);
		chatServer.verify();
	}

	@Test
	void embedReturnsVectorList() {
		String responseJson = """
				{
				  "model": "nomic-embed-text",
				  "embeddings": [
				    [0.1, 0.2, 0.3, 0.4]
				  ]
				}
				""";

		embedServer.expect(MockRestRequestMatchers.requestTo("http://localhost:11434/api/embed"))
				.andExpect(MockRestRequestMatchers.method(HttpMethod.POST))
				.andRespond(MockRestResponseCreators.withSuccess(responseJson, MediaType.APPLICATION_JSON));

		List<Double> vector = client.embed("React developer");
		assertNotNull(vector);
		assertEquals(4, vector.size());
		assertEquals(0.1, vector.get(0));
		embedServer.verify();
	}

	@Test
	void handlesOllamaErrorGracefully() {
		chatServer.expect(MockRestRequestMatchers.requestTo("http://localhost:11434/api/chat"))
				.andRespond(MockRestResponseCreators.withServerError());

		OllamaException ex = assertThrows(OllamaException.class, () -> client.generate("test"));
		assertEquals(OllamaException.USER_MESSAGE, ex.getMessage());
		chatServer.verify();
	}
}
