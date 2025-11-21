package com.patrihub.patri_hub_api.model;

import com.patrihub.patri_hub_api.model.Asset;
import com.patrihub.patri_hub_api.model.Heir;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "heirs_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeirAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "heir_id", nullable = false)
    private Heir heir;
}