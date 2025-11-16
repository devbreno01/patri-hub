package com.patrihub.patri_hub_api.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data 
@Entity
@Table(name="assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(name = "user_id")
    private long userIid; 
    
    private String name; 
    private String description; 
    private Character category; 

    @Column(name = "state_of_conservation")
    private Character stateOfConservation; 
    
    private BigDecimal value; 
    private String photo; 
    private Character status; 


}
