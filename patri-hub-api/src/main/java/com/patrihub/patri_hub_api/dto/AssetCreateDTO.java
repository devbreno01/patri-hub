package com.patrihub.patri_hub_api.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.*;
public record AssetCreateDTO(
    @NotBlank(message = "É preciso informar nome")
    String name, 

    String description, 
    
    @NotNull(message = "Categoria is requirido")
    Character category, 
    Character stateOfConservation, 
    BigDecimal value, 
    String photo, 
    Character status

) {}; 
