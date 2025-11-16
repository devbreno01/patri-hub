package com.patrihub.patri_hub_api.dto;

import java.math.BigDecimal;

public record AssetResponseDTO(
    String name, 
    String description, 
    Character category, 
    Character stateOfConservation, 
    BigDecimal value, 
    String photo, 
    Character status
) {}