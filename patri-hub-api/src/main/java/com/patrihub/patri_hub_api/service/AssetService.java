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

import jakarta.servlet.http.HttpServletRequest;

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
    private final HttpServletRequest request; 

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

    public AssetResponseDTO update(Long id, AssetCreateDTO dto) {
        String token = getTokenFromHeader();
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Asset asset = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patrimônio não encontrado"));

       
        if (asset.getUserIid() != user.getId()) {
            throw new RuntimeException("Você não tem permissão para alterar este patrimônio!");
        }

        asset.setName(dto.name());
        asset.setDescription(dto.description());
        asset.setCategory(dto.category());
        asset.setStateOfConservation(dto.stateOfConservation());
        asset.setValue(dto.value());
        asset.setPhoto(dto.photo());
        asset.setStatus(dto.status());

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

    public void delete (Long id){
        String token = getTokenFromHeader(); 
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Asset asset = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Patrimônio não encontrado"));
        
        if (asset.getUserIid() != user.getId()) {
            throw new RuntimeException("Você não tem permissão para excluir este patrimônio!");
        }

        repository.delete(asset);
       
    }

    public List<AssetResponseDTO> findAllByLoggedUser() {
        String token = getTokenFromHeader();
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        
        List<Asset> assets = repository.findByUserIid(user.getId());

        return assets.stream().map(asset ->
            new AssetResponseDTO(
                asset.getName(),
                asset.getDescription(),
                asset.getCategory(),
                asset.getStateOfConservation(),
                asset.getValue(),
                asset.getPhoto(),
                asset.getStatus()
            )
        ).toList();
    }

    public AssetResponseDTO findByIdByLoggedUser(Long id) {
        String token = getTokenFromHeader();
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        
        Asset asset = repository.findByIdAndUserIid(id, user.getId())
            .orElseThrow(() -> new RuntimeException("Patrimônio não encontrado ou não pertence ao usuário"));
            
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

    
    private String getTokenFromHeader() {
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new RuntimeException("Token não encontrado no header");
        }
        return auth.substring(7);
    }

}
