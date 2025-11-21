package com.patrihub.patri_hub_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "heirs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Heir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    private String phoneNumber;

    private String relation;
}
