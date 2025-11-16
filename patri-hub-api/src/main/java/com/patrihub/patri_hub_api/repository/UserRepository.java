package com.patrihub.patri_hub_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.patrihub.patri_hub_api.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
