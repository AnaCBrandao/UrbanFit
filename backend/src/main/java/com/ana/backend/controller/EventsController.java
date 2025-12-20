package com.ana.backend.controller;

import com.ana.backend.model.Event;
import com.ana.backend.repository.EventRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/api/events")
@AllArgsConstructor
public class EventsController {

    private final EventRepository eventRepository;

    private Optional<Long> getUserId(HttpSession session) {
        Object id = session.getAttribute("USER_ID");
        if (id instanceof Long l) return Optional.of(l);
        return Optional.empty();
    }

    @GetMapping
    public ResponseEntity<List<Event>> list(HttpSession session) {
        var userIdOpt = getUserId(session);
        if (userIdOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> findById(@PathVariable @NotNull @Positive Long id, HttpSession session) {
        var userIdOpt = getUserId(session);
        if (userIdOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return eventRepository.findById(id)           
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Event> create(@RequestBody @Valid Event record, HttpSession session) {
        var userIdOpt = getUserId(session);
        if (userIdOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        record.setId(null);

        Event saved = eventRepository.save(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable @NotNull @Positive Long id, HttpSession session) {
        var userIdOpt = getUserId(session);
        if (userIdOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

     
    return eventRepository.findById(id)
        .map(ev -> {
            eventRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        })
        .orElse(ResponseEntity.notFound().build());
    }

}
