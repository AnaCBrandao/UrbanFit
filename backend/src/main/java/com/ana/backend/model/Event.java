package com.ana.backend.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;             

    @NotBlank
    @NotNull 
    @Length(min=5, max=200)
    @Column(length = 200, nullable = false)
    private String name;

    private String description;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String local;

    @NotNull
    private Double lat;

    @NotNull
    private Double lng;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String date;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String time;

    public Event(String name, String description, String local, Double lat, Double lng, String date, String time) {
        this.name = name;
        this.description = description;
        this.local = local;
        this.lat = lat;
        this.lng = lng;
        this.date = date;
        this.time = time;
    }

    
    @ElementCollection
    @CollectionTable(
        name = "event_attendees",
        joinColumns = @JoinColumn(name = "event_id")
    )
    @Column(name = "user_id")
    private List<Long> attendees = new ArrayList<>();
}