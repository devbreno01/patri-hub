package com.patrihub.patri_hub_api.service;

/*
 *model 
 *dto 
 repository 
 */

import com.patrihub.patri_hub_api.model.Asset; 
import com.patrihub.patri_hub_api.dto.AssetCreateDTO;
import com.patrihub.patri_hub_api.dto.AssetResponseDTO;
import com.patrihub.patri_hub_api.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository repository; 

    public AssetResponseDTO create (AssetCreateDTO dto){
        Asset asset = new Asset(); 
        asset.setName(dto.name()); 
        asset.setDescription(dto.description());
        asset.setCategory(dto.category());
        asset.setStateOfConservation(dto.stateOfConservation());
        asset.setValue(dto.value());
        asset.setPhoto(dto.photo());
        asset.setStatus(dto.status());

        //persiste no banco 
        repository.save(asset); 

        return new AssetResponseDTO(
            asset.getName(),
            asset.getDescription(), 
            asset.getCategory(), 
            asset.getStateOfConservation(), 
            asset.getValue(), 
            asset.getPhoto(), 
            asset.getStatus()

        );
    }

}
