package com.ana.backend.model;


<<<<<<< HEAD
@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false) 
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String date;

    @Column
    private String time;

    @ForeignKey(name = "id_creator", referencedColumnName = "id")
    private Long id_creator;
=======
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
>>>>>>> e5c44fd (event-form component)
}