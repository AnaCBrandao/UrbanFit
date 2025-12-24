package com.ana.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ana.backend.auth.LoginRequest;
import com.ana.backend.auth.LoginResponse;
import com.ana.backend.auth.UpdateMeRequest;
import com.ana.backend.model.Users;
import com.ana.backend.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UsersRepository repo;

  public AuthController(UsersRepository repo) {
    this.repo = repo;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req, HttpSession session) {
    var opt = repo.findByEmail(req.email());
    if (opt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuário ou senha inválidos"));
    }
    var user = opt.get();

    if (!req.password().equals(user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuário ou senha inválidos"));
    }

    session.setAttribute("USER_ID", user.getId());
    session.setAttribute("USER_EMAIL", user.getEmail());
    session.setAttribute("USER_NAME", user.getName());

    return ResponseEntity.ok(new LoginResponse(user.getId(), user.getName(), user.getEmail(), user.getAge()));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/me")
  public ResponseEntity<?> me(HttpSession session) {
    var id = session.getAttribute("USER_ID");
    if (id == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    var email = (String) session.getAttribute("USER_EMAIL");
    var name  = (String) session.getAttribute("USER_NAME");
    return ResponseEntity.ok(Map.of("id", id, "email", email, "name", name));
  }

  
  @PutMapping("/me")
  public ResponseEntity<?> updateMe(@RequestBody UpdateMeRequest req, HttpSession session) {
    Long id = (Long) session.getAttribute("USER_ID");
    if (id == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    Optional<Users> opt = repo.findById(id);
      if (opt.isEmpty()) {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
      }

      Users user = opt.get();

      if (req.name() == null || req.name().isBlank()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Nome é obrigatório"));
      }
      if (req.email() == null || req.email().isBlank()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Email é obrigatório"));
      }

      user.setName(req.name());
      user.setEmail(req.email());
      user.setAge(req.age());
      repo.save(user);

      session.setAttribute("USER_EMAIL", user.getEmail());
      session.setAttribute("USER_NAME", user.getName());

      return ResponseEntity.ok(new LoginResponse(user.getId(), user.getName(), user.getEmail(), user.getAge()));
  }
}
