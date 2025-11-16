package com.patrihub.patri_hub_api.controller;

/*
 * dtos
 * model
 * repository
 * service
 */
import com.patrihub.patri_hub_api.dto.AssetCreateDTO;
import com.patrihub.patri_hub_api.dto.AssetResponseDTO;
import com.patrihub.patri_hub_api.model.Asset;
import com.patrihub.patri_hub_api.repository.AssetRepository;
import com.patrihub.patri_hub_api.service.AssetService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("api/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetRepository repository; 
    private final AssetService assetService; 

    @PostMapping("/create")
    public ResponseEntity<?> register (@RequestBody AssetCreateDTO dto){
        AssetResponseDTO asset = assetService.create(dto); 

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of(
                "Patrimonio cadastrado com sucesso",
                asset
            ));
    }

}
