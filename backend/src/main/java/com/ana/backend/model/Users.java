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
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;             

    @NotBlank
    @NotNull 
    @Length(min=5, max=200)
    @Column(length = 200, nullable = false)
    private String name;

    @NotBlank
    @NotNull
    @Length(min=10, max=500)
    @Column(length = 500, nullable = false)
    private String email;

    @Column(nullable = true)
    private Integer age;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String password;

    public Users(String name, String email, Integer age, String password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
    }

    public String getName() {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public Long getId() {
        return this.id;
    }

    public String getPassword() {
        return this.password;
    }

    public Integer getAge() {
        return this.age;
    }
}
