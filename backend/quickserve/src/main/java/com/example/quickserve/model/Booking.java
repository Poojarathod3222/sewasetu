package com.example.quickserve.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User Info
    private String name;

    @Column(nullable = false)
    private String userEmail; // ✅ changed from Useremail → userEmail

    private String phone;
    private String address;

    // Service Info
    @Column(nullable = false)
    private String providerService;

    @Column(nullable = false)
    private String providerEmail;

    private LocalDateTime bookingDate;

    private String status;
}
