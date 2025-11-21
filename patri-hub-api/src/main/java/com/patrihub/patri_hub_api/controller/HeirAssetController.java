package com.patrihub.patri_hub_api.controller;
import com.patrihub.patri_hub_api.service.HeirAssetService;
import com.patrihub.patri_hub_api.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HeirAssetController {

    private final HeirAssetService service;

    public HeirAssetController(HeirAssetService service) {
        this.service = service;
    }

    // ASSOCIA HERDEIRO AO ASSET
    @PostMapping("/assets/{assetId}/heirs/{heirId}")
    public ResponseEntity<HeirAssetResponseDTO> associate(
            @PathVariable Long assetId,
            @PathVariable Long heirId
    ) {
        return ResponseEntity
                .status(201)
                .body(service.associate(assetId, heirId));
    }

    // DESASSOCIA HERDEIRO DO ASSET
    @DeleteMapping("/assets/{assetId}/heirs/{heirId}")
    public ResponseEntity<?> disassociate(
            @PathVariable Long assetId,
            @PathVariable Long heirId
    ) {
        service.disassociate(assetId, heirId);
        return ResponseEntity.ok(
                java.util.Map.of(
                        "status", "success",
                        "message", "Associação removida com sucesso"
                )
        );
    }

    // LISTA HERDEIROS VINCULADOS A UM ASSET
    @GetMapping("/assets/{assetId}/heirs")
    public ResponseEntity<List<HeirAssetResponseDTO>> listHeirsByAsset(
            @PathVariable Long assetId
    ) {
        return ResponseEntity.ok(service.listHeirsByAsset(assetId));
    }

    // LISTA ASSETS VINCULADOS A UM HERDEIRO
    @GetMapping("/heirs/{heirId}/assets")
    public ResponseEntity<List<HeirAssetResponseDTO>> listAssetsByHeir(
            @PathVariable Long heirId
    ) {
        return ResponseEntity.ok(service.listAssetsByHeir(heirId));
    }
}