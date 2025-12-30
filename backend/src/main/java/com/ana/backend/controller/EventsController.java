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

import java.util.ArrayList;
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

    
    @PutMapping("/{id}/attend")
    public ResponseEntity<Event> attend(@PathVariable Long id, HttpSession session) {
        var userId = session.getAttribute("USER_ID");
        if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return eventRepository.findById(id)
            .map(ev -> {
                List<Long> list = ev.getAttendees();
                if (list == null) list = new ArrayList<>();
                Long uid = (userId instanceof Integer) ? Long.valueOf((Integer) userId) : (Long) userId;

                if (!list.contains(uid)) list.add(uid);
                ev.setAttendees(list);

                return ResponseEntity.ok(eventRepository.save(ev));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    
    @PutMapping("/{id}/unattend")
    public ResponseEntity<Event> unattend(@PathVariable Long id, HttpSession session) {
        var userId = session.getAttribute("USER_ID");
        if (userId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return eventRepository.findById(id)
            .map(ev -> {
                Long uid = (userId instanceof Integer) ? Long.valueOf((Integer) userId) : (Long) userId;
                List<Long> list = ev.getAttendees();
                if (list != null) {
                    list.remove(uid);
                    ev.setAttendees(list);
                }
                return ResponseEntity.ok(eventRepository.save(ev));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Event>> listMine(HttpSession session) {
        var userIdOpt = getUserId(session);
        if (userIdOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long uid = userIdOpt.get();

        List<Event> mine = eventRepository.findAll()
            .stream()
            .filter(ev -> ev.getAttendees() != null && ev.getAttendees().contains(uid))
            .collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(mine);
    }

}
