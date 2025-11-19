package com.patrihub.patri_hub_api.controller;

import com.patrihub.patri_hub_api.dto.LoginDTO;
import com.patrihub.patri_hub_api.dto.UserCreateDTO;
import com.patrihub.patri_hub_api.dto.UserResponseDTO;
import com.patrihub.patri_hub_api.dto.MessageResponse;
import com.patrihub.patri_hub_api.model.User;
import com.patrihub.patri_hub_api.repository.UserRepository;
import com.patrihub.patri_hub_api.service.JwtService;
import com.patrihub.patri_hub_api.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository; 
    private final UserService userService; 
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCreateDTO dto){
        UserResponseDTO user = userService.create(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new MessageResponse("Usuário criado com sucesso!", user));
    }


     @PostMapping("/login")
     public ResponseEntity<?> login(@RequestBody LoginDTO dto){

        User user = repository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(dto.password(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

          String token = jwtService.generateToken(user.getEmail());

          return ResponseEntity
            .ok(Map.of(
                    "message", "Login realizado com sucesso!",
                    "status", "Authorized",
                    "token", token
            ));
        }
}
