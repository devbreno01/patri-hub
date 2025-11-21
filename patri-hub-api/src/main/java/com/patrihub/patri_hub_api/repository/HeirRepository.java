package com.patrihub.patri_hub_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patrihub.patri_hub_api.model.Heir;

import java.util.List;
import java.util.Optional;

public interface HeirRepository extends JpaRepository<Heir, Long> {

    // Lista todos os heirs do usuário autenticado
    List<Heir> findByUserId(Long userId);

    // Busca um heir específico do usuário autenticado
    Optional<Heir> findByIdAndUserId(Long id, Long userId);
}