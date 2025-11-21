package com.patrihub.patri_hub_api.controller;

import com.patrihub.patri_hub_api.service.HeirService;
import com.patrihub.patri_hub_api.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/heirs")
public class HeirController {

    private final HeirService heirService;

    public HeirController(HeirService heirService) {
        this.heirService = heirService;
    }

    @PostMapping
    public ResponseEntity<HeirResponseDTO> create(@RequestBody HeirCreateDTO dto) {
        return ResponseEntity.status(201).body(heirService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<HeirResponseDTO>> findAll() {
        return ResponseEntity.ok(heirService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HeirResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(heirService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeirResponseDTO> update(
            @PathVariable Long id,
            @RequestBody HeirUpdateDTO dto
    ) {
        return ResponseEntity.ok(heirService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        heirService.delete(id);

        return ResponseEntity.ok(
            Map.of(
                "message", "Herdeiro deletado",
                "status", "success"
            )
        );
    }
}