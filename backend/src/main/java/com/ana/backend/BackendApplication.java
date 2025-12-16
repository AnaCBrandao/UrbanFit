package com.ana.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.ana.backend.model.Event;
import com.ana.backend.repository.EventRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(EventRepository eventRepository) {
		return args -> {
			eventRepository.deleteAll();
			eventRepository.save(new Event("Yoga Class", "A relaxing yoga session", "Rua 2", "20/2/2024", "10:00 AM"));
		};
	}
}

