package com.cengavers.features.announcement.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAnnouncementRequest {
    
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;
    
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;
    
    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;
    
    private Boolean status;
}

