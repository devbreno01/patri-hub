package com.patrihub.patri_hub_api.service;

import com.patrihub.patri_hub_api.dto.*;
import com.patrihub.patri_hub_api.model.Heir;
import com.patrihub.patri_hub_api.model.User;
import com.patrihub.patri_hub_api.repository.HeirRepository;
import com.patrihub.patri_hub_api.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HeirService {

    private final HeirRepository heirRepository;
    private final UserRepository userRepository;

    public HeirService(HeirRepository heirRepository, UserRepository userRepository) {
        this.heirRepository = heirRepository;
        this.userRepository = userRepository;
    }

    private Long getAuthenticatedUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    public HeirResponseDTO create(HeirCreateDTO dto) {
        User user = getAuthenticatedUser();

        Heir heir = Heir.builder()
                .user(user)
                .name(dto.name())
                .phoneNumber(dto.phoneNumber())
                .relation(dto.relation())
                .build();

        heirRepository.save(heir);

        return new HeirResponseDTO(
                heir.getId(),
                heir.getName(),
                heir.getPhoneNumber(),
                heir.getRelation()
        );
    }

    public List<HeirResponseDTO> findAll() {
        Long userId = getAuthenticatedUserId();

        return heirRepository.findByUserId(userId)
                .stream()
                .map(h -> new HeirResponseDTO(
                        h.getId(),
                        h.getName(),
                        h.getPhoneNumber(),
                        h.getRelation()
                )).toList();
    }

    public HeirResponseDTO findById(Long id) {
        Long userId = getAuthenticatedUserId();

        Heir heir = heirRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Herdeiro não encontrado"));

        return new HeirResponseDTO(
                heir.getId(),
                heir.getName(),
                heir.getPhoneNumber(),
                heir.getRelation()
        );
    }

    public HeirResponseDTO update(Long id, HeirUpdateDTO dto) {
        Long userId = getAuthenticatedUserId();

        Heir heir = heirRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Herdeiro não encontrado"));

        heir.setName(dto.name());
        heir.setPhoneNumber(dto.phoneNumber());
        heir.setRelation(dto.relation());

        heirRepository.save(heir);

        return new HeirResponseDTO(
                heir.getId(),
                heir.getName(),
                heir.getPhoneNumber(),
                heir.getRelation()
        );
    }

    public void delete(Long id) {
        Long userId = getAuthenticatedUserId();

        Heir heir = heirRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Herdeiro não encontrado"));

        heirRepository.delete(heir);
    }
}