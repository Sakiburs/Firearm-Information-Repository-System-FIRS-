package com.firs.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.firs.project.model.User;
import com.firs.project.service.AuthService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public User login(@RequestBody User request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}
