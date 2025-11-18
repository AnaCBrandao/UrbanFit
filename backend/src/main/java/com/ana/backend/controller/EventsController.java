package com.ana.backend.controller;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    @GetMapping
    public List<Event> list() {
        return null;
=======
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

import com.ana.backend.model.Event;
import com.ana.backend.repository.EventRepository;

@RestController
@RequestMapping("/api/events")
@AllArgsConstructor
public class EventsController {

    private final EventRepository eventRepository;

    @GetMapping
    public List<Event> list() {
        return eventRepository.findAll();
>>>>>>> e5c44fd (event-form component)
    }
}
