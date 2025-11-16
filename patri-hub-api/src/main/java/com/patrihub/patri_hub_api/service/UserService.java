package com.patrihub.patri_hub_api.service;

import com.patrihub.patri_hub_api.dto.UserCreateDTO;
import com.patrihub.patri_hub_api.dto.UserResponseDTO;
import com.patrihub.patri_hub_api.model.User;
import com.patrihub.patri_hub_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository; 
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserResponseDTO create(UserCreateDTO dto){
        User user = new User();    
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(encoder.encode(dto.password()));
        user.setOccupation(dto.occupation());
        user.setTypeOfJob(dto.typeOfJob());

        repository.save(user); 

        return new UserResponseDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getOccupation(),
            user.getTypeOfJob()
        ); 
    }
}