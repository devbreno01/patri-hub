package com.patrihub.patri_hub_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.patrihub.patri_hub_api.model.HeirAsset;
import java.util.List;
import java.util.Optional;

public interface HeirAssetRepository extends JpaRepository<HeirAsset, Long> {

    List<HeirAsset> findByAssetUserIid(Long userId);

    Optional<HeirAsset> findByIdAndAssetUserIid(Long id, Long userId);
}