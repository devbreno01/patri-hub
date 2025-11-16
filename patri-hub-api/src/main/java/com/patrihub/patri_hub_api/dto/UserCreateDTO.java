package com.patrihub.patri_hub_api.dto;

public record UserCreateDTO(
    String name,
    String email,
    String password,
    String occupation,
    String typeOfJob
){};
