package com.patrihub.patri_hub_api.dto;

public record UserResponseDTO (
    Long id,
    String name,
    String email,
    String occupation,
    String typeOfJob
){};
