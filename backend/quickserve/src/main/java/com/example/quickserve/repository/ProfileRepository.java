package com.example.quickserve.repository;

import com.example.quickserve.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    // 🔍 Find profile by email (used for login & dashboard)
    Optional<Profile> findByEmail(String email);

    // 🏙️ Find all providers in a specific city/address (used in city-wise search)
    List<Profile> findByRoleAndAddressContainingIgnoreCase(String role, String address);

    List<Profile> findByRoleAndAddressContainingIgnoreCaseAndServiceOfferedContainingIgnoreCase(
            String role, String address, String serviceOffered);

}
