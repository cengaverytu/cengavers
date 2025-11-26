package com.cengavers.features.announcement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

