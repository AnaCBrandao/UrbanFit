package com.ana.backend.model;


import jakarta.persistence.*;
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

    private String name;
    private String description;
    private String local;
    private String date;
    private String time;


    public Event(String name, String description, String local, String date, String time) {
        this.name = name;
        this.description = description;
        this.local = local;
        this.date = date;
        this.time = time;
    }
}