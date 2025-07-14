package com.example.quickserve.controller;

import com.example.quickserve.model.Profile;
import com.example.quickserve.repository.ProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*") // Or use your frontend URL
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads"
            + File.separator;

    // ✅ Get profile by email
    // ✅ Get profile by email
    @GetMapping("/by-email/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        Optional<Profile> profileOpt = profileRepository.findByEmail(email);
        if (profileOpt.isPresent()) {
            return ResponseEntity.ok(profileOpt.get());
        } else {
            return ResponseEntity.status(404).body("❌ Profile not found for email: " + email);
        }
    }

    // ✅ Get profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProfileById(@PathVariable Long id) {
        Optional<Profile> profileOpt = profileRepository.findById(id);
        if (profileOpt.isPresent()) {
            return ResponseEntity.ok(profileOpt.get());
        } else {
            return ResponseEntity.status(404).body("❌ Profile not found with ID: " + id);
        }
    }

    // ✅ Create new profile
    @PostMapping
    public ResponseEntity<?> createProfile(
            @ModelAttribute Profile profile,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            if (profileRepository.findByEmail(profile.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Profile already exists for this email.");
            }

            if (photo != null && !photo.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(photo.getOriginalFilename());
                Path uploadPath = Paths.get(UPLOAD_DIR);
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(fileName);
                photo.transferTo(filePath);
                profile.setPhotoPath(fileName);
            }

            Profile savedProfile = profileRepository.save(profile);
            return ResponseEntity.ok(savedProfile);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while creating profile: " + e.getMessage());
        }
    }

    // ✅ Update profile by ID
    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("role") String role,
            @RequestParam(value = "serviceOffered", required = false) String serviceOffered,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            Optional<Profile> opt = profileRepository.findById(id);
            if (opt.isEmpty()) {
                return ResponseEntity.status(404).body("Profile not found with ID: " + id);
            }

            Profile profile = opt.get();
            profile.setName(name);
            profile.setEmail(email);
            profile.setPhone(phone);
            profile.setAddress(address);
            profile.setRole(role);

            if ("Provider".equalsIgnoreCase(role)) {
                profile.setServiceOffered(serviceOffered);
            } else {
                profile.setServiceOffered(null);
            }

            if (photo != null && !photo.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(photo.getOriginalFilename());
                Path uploadPath = Paths.get(UPLOAD_DIR);
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(fileName);
                photo.transferTo(filePath);
                profile.setPhotoPath(fileName);
            }

            Profile updatedProfile = profileRepository.save(profile);
            return ResponseEntity.ok(updatedProfile);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error updating profile: " + e.getMessage());
        }
    }

    // ✅ Serve image by filename
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws MalformedURLException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists()) {
            String contentType = "application/octet-stream";
            try {
                contentType = Files.probeContentType(filePath);
            } catch (IOException ignored) {
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Search providers by city/service
    @GetMapping("/search")
    public ResponseEntity<?> searchProviders(
            @RequestParam String city,
            @RequestParam(required = false) String service) {

        List<Profile> providers;

        if (service != null && !service.isEmpty()) {
            providers = profileRepository.findByRoleAndAddressContainingIgnoreCaseAndServiceOfferedContainingIgnoreCase(
                    "Provider", city, service);
        } else {
            providers = profileRepository.findByRoleAndAddressContainingIgnoreCase("Provider", city);
        }

        return ResponseEntity.ok(providers);
    }
}
