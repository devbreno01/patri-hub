package com.patrihub.patri_hub_api.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.patrihub.patri_hub_api.model.Asset;



public interface AssetRepository extends JpaRepository<Asset,Long>{
    
}
