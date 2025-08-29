package com.example.quickserve.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private String customerName;
    private String providerEmail;
    private String service;
    private String status;
}
