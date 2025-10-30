package com.ana.backend.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    @GetMapping
    public List<Event> list() {
        return null;
    }
}
