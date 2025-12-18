package com.ana.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ana.backend.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    
}
