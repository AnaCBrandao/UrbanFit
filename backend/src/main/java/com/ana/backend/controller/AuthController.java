package com.ana.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ana.backend.auth.LoginRequest;
import com.ana.backend.auth.LoginResponse;
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

    if (!req.senha().equals(user.getSenha())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuário ou senha inválidos"));
    }

    session.setAttribute("USER_ID", user.getId());
    session.setAttribute("USER_EMAIL", user.getEmail());
    session.setAttribute("USER_NOME", user.getNome());

    return ResponseEntity.ok(new LoginResponse(user.getId(), user.getNome(), user.getEmail()));
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
    var nome  = (String) session.getAttribute("USER_NOME");
    return ResponseEntity.ok(Map.of("id", id, "email", email, "nome", nome));
  }
}
