package com.example.quickserve.controller;

import com.example.quickserve.model.Booking;
import com.example.quickserve.model.BookingDTO;
import com.example.quickserve.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ 1. Create new booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            System.out.println("Received booking: " + booking);
            booking.setStatus("Pending");

            if (booking.getName() == null || booking.getName().trim().isEmpty()
                    || booking.getUserEmail() == null || booking.getUserEmail().trim().isEmpty()
                    || booking.getPhone() == null || booking.getPhone().trim().isEmpty()
                    || booking.getAddress() == null || booking.getAddress().trim().isEmpty()
                    || booking.getProviderService() == null || booking.getProviderService().trim().isEmpty()
                    || booking.getBookingDate() == null
                    || booking.getProviderEmail() == null || booking.getProviderEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("❌ Missing required fields in booking request.");
            }

            Booking saved = bookingRepository.save(booking);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Booking failed: " + e.getMessage());
        }
    }

    // ✅ 2. Get bookings by user email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String email) {
        List<Booking> bookings = bookingRepository.findByUserEmail(email);
        return ResponseEntity.ok(bookings);
    }

    // ✅ 3. Get bookings by provider email
    @GetMapping("/provider/{email}")
    public ResponseEntity<List<Booking>> getProviderBookings(@PathVariable String email) {
        List<Booking> bookings = bookingRepository.findByProviderEmail(email);
        return ResponseEntity.ok(bookings);
    }

    // ✅ 4. Get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    // ✅ 5. Update booking status
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.status(404).body("❌ Booking not found with ID: " + id);
        }

        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        return ResponseEntity.ok(updated);
    }

    // ✅ 6. (Optional) DTO-based view
    @GetMapping("/provider-dto/{email}")
    public List<BookingDTO> getProviderDTO(@PathVariable String email) {
        List<Booking> bookings = bookingRepository.findByProviderEmail(email);
        return bookings.stream()
                .map(b -> new BookingDTO(
                        b.getName(),
                        b.getProviderEmail(),
                        b.getProviderService(),
                        b.getStatus()))
                .toList();
    }
}
