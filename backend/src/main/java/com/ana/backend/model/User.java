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
public class User {
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

    private Number idade;

    @NotBlank
    @NotNull 
    @Column(nullable = false)
    private String senha;

    public User(String name, String email, Number idade, String senha) {
        this.name = name;
        this.email = email;
        this.idade = idade;
        this.senha = senha;
    }
}
