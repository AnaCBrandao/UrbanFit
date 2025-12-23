package com.ana.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.ana.backend.model.Event;
import com.ana.backend.model.Users;
import com.ana.backend.repository.EventRepository;
import com.ana.backend.repository.UsersRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(EventRepository eventRepository, UsersRepository usersRepository) {
		return args -> {
			eventRepository.deleteAll();
			usersRepository.deleteAll();
			eventRepository.save(new Event("Yoga Class", "A relaxing yoga session", "Rua Laura C. Camargo 59, Araraquara - São Paulo, 14810-145, Brasil", -21.782729, -48.177136, "20/2/2024", "10:00 AM"));
			usersRepository.save(new Users("Ana Brandao", "ana@gmail.com", "22", "123"));
		};
	}
}
