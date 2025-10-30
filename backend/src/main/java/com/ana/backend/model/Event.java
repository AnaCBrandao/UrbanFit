package com.ana.backend.model;


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
}