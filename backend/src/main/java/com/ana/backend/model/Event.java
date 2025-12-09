package com.ana.backend.model;

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

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String date;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String time;


    public Event(String name, String description, String local, String date, String time) {
        this.name = name;
        this.description = description;
        this.local = local;
        this.date = date;
        this.time = time;
    }
}