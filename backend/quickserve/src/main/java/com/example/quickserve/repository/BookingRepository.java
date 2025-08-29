package com.example.quickserve.repository;

import com.example.quickserve.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

        List<Booking> findByUserEmail(String userEmail); // ✅ match field name in Booking.java

        List<Booking> findByProviderEmail(String providerEmail); // ✅ match field name in Booking.java
}
