package com.ana.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ana.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}
