package com.patrihub.patri_hub_api.controller;

/*
 * dtos
 * model
 * repository
 * service
 */
import com.patrihub.patri_hub_api.dto.AssetCreateDTO;
import com.patrihub.patri_hub_api.dto.AssetResponseDTO;
import com.patrihub.patri_hub_api.repository.AssetRepository;
import com.patrihub.patri_hub_api.service.AssetService;
import com.patrihub.patri_hub_api.repository.UserRepository;
import com.patrihub.patri_hub_api.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetRepository repository; 
    private final AssetService assetService; 
    private final UserRepository userRepository; 
    private final JwtService jwtService; 

    @PostMapping("/create")
    public ResponseEntity<?> register (@RequestBody AssetCreateDTO dto){
        AssetResponseDTO asset = assetService.create(dto); 
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of(
                "message:","Patrimonio cadastrado com sucesso",
                "data", asset
            ));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<AssetResponseDTO> list = assetService.findAllByLoggedUser();

        return ResponseEntity.ok(
            Map.of(
                "message", "Lista de Patrimônios",
                "data", list
            )
        );
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        AssetResponseDTO dto = assetService.findByIdByLoggedUser(id);

        return ResponseEntity.ok(
            Map.of(
                "message", "Patrimônio encontrado",
                "data", dto
            )
        );
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(
        @PathVariable Long id,
        @RequestBody AssetCreateDTO dto) {

            AssetResponseDTO updated = assetService.update(id, dto);

            return ResponseEntity.ok(
                Map.of(
                    "message", "Patrimônio atualizado com sucesso!",
                    "data", updated
                )
            );
        }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        assetService.delete(id);
        return ResponseEntity.ok(
            Map.of(
                "status" , "success",
                "message", "Patrimônio deletado com sucesso!"
            )
        );
    }

}
