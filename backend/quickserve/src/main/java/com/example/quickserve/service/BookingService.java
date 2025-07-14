package com.example.quickserve.service;

import com.example.quickserve.model.Booking;
import com.example.quickserve.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        booking.setStatus("Pending");
        return bookingRepository.save(booking);
    }
}
