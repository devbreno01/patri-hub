package com.patrihub.patri_hub_api.dto;

public record HeirAssetResponseDTO(
        Long id,
        Long assetId,
        String assetName,
        Long heirId,
        String heirName
) {}