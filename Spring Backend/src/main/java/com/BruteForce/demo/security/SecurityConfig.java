package com.BruteForce.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.httpBasic(Customizer.withDefaults())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/ai/**")
						.hasRole("STUDENT")
						.requestMatchers("/api/matching/**")
						.hasAnyRole("STUDENT", "INDUSTRY")
						.anyRequest()
						.authenticated());
		return http.build();
	}

	/**
	 * Temporary local student until JWT from the core auth flow is in place.
	 * Username {@code student}, password {@code student}.
	 */
	@Bean
	UserDetailsService userDetailsService() {
		return new InMemoryUserDetailsManager(User.withUsername("student")
				.password("{noop}student")
				.roles("STUDENT")
				.build());
	}
}
