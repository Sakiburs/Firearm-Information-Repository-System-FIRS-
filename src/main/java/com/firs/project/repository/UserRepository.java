package com.firs.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firs.project.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
