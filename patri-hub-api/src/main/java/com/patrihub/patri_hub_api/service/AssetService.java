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
import com.patrihub.patri_hub_api.repository.UserRepository;
import com.patrihub.patri_hub_api.service.UserService;
import com.patrihub.patri_hub_api.model.User;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository repository; 
    private final UserRepository userRepository; 
    private final JwtService jwtService; 

    public AssetResponseDTO create(AssetCreateDTO dto) {
    User user = (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

    Asset asset = new Asset();
    asset.setName(dto.name());
    asset.setDescription(dto.description());
    asset.setCategory(dto.category());
    asset.setStateOfConservation(dto.stateOfConservation());
    asset.setValue(dto.value());
    asset.setPhoto(dto.photo());
    asset.setStatus(dto.status());
    asset.setUserIid(user.getId());

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


    public List<AssetResponseDTO> findAll() {
        List<Asset> assets = repository.findAll();

          return assets.stream()
            .map(asset -> new AssetResponseDTO(
                asset.getName(),
                asset.getDescription(),
                asset.getCategory(),
                asset.getStateOfConservation(),
                asset.getValue(),
                asset.getPhoto(),
                asset.getStatus()
            ))
            .toList();
    }

}
