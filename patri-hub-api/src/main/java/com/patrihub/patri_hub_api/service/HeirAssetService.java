package com.patrihub.patri_hub_api.service;

import com.patrihub.patri_hub_api.model.Asset;
import com.patrihub.patri_hub_api.repository.AssetRepository;
import com.patrihub.patri_hub_api.repository.HeirAssetRepository;
import com.patrihub.patri_hub_api.model.Heir;
import com.patrihub.patri_hub_api.model.HeirAsset;
import com.patrihub.patri_hub_api.repository.HeirRepository;
import com.patrihub.patri_hub_api.dto.*;
import com.patrihub.patri_hub_api.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HeirAssetService {

    private final HeirAssetRepository repository;
    private final AssetRepository assetRepository;
    private final HeirRepository heirRepository;
    private final UserRepository userRepository;

    public HeirAssetService(
            HeirAssetRepository repository,
            AssetRepository assetRepository,
            HeirRepository heirRepository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.assetRepository = assetRepository;
        this.heirRepository = heirRepository;
        this.userRepository = userRepository;
    }

    private Long getAuthUserId() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    public HeirAssetResponseDTO associate(Long assetId, Long heirId) {
        Long userId = getAuthUserId();

        Asset asset = assetRepository.findByIdAndUserIid(assetId, userId)
                .orElseThrow(() -> new RuntimeException("Asset não encontrado ou não pertence ao usuário"));

        Heir heir = heirRepository.findByIdAndUserId(heirId, userId)
                .orElseThrow(() -> new RuntimeException("Herdeiro não encontrado ou não pertence ao usuário"));

        HeirAsset entity = HeirAsset.builder()
                .asset(asset)
                .heir(heir)
                .build();

        repository.save(entity);

        return new HeirAssetResponseDTO(
                entity.getId(),
                asset.getId(),
                asset.getName(),
                heir.getId(),
                heir.getName()
        );
    }

    public void disassociate(Long assetId, Long heirId) {
        Long userId = getAuthUserId();

        
        HeirAsset entity = repository
                .findByAssetUserIid(userId)
                .stream()
                .filter(e -> e.getAsset().getId().equals(assetId) && e.getHeir().getId().equals(heirId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Associação não encontrada"));

        repository.delete(entity);
    }

    public List<HeirAssetResponseDTO> listHeirsByAsset(Long assetId) {
        Long userId = getAuthUserId();

      
        assetRepository.findByIdAndUserIid(assetId, userId)
                .orElseThrow(() -> new RuntimeException("Asset não encontrado ou não pertence ao usuário"));

        return repository.findByAssetUserIid(userId)
                .stream()
                .filter(e -> e.getAsset().getId().equals(assetId))
                .map(e -> new HeirAssetResponseDTO(
                        e.getId(),
                        e.getAsset().getId(),
                        e.getAsset().getName(),
                        e.getHeir().getId(),
                        e.getHeir().getName()
                ))
                .toList();
    }

    public List<HeirAssetResponseDTO> listAssetsByHeir(Long heirId) {
        Long userId = getAuthUserId();

    
        heirRepository.findByIdAndUserId(heirId, userId)
                .orElseThrow(() -> new RuntimeException("Herdeiro não encontrado ou não pertence ao usuário"));

        return repository.findByAssetUserIid(userId)
                .stream()
                .filter(e -> e.getHeir().getId().equals(heirId))
                .map(e -> new HeirAssetResponseDTO(
                        e.getId(),
                        e.getAsset().getId(),
                        e.getAsset().getName(),
                        e.getHeir().getId(),
                        e.getHeir().getName()
                ))
                .toList();
    }

}
