package com.cengavers.features.announcement.dto.converter;

import com.cengavers.features.announcement.dto.AnnouncementDTO;
import com.cengavers.features.announcement.entity.Announcement;
import org.springframework.stereotype.Component;

@Component
public class AnnouncementDTOConverter {
    
    public AnnouncementDTO convert(Announcement announcement) {
        return new AnnouncementDTO(
            announcement.getId(),
            announcement.getTitle(),
            announcement.getDescription(),
            announcement.getImageUrl(),
            announcement.getStatus(),
            announcement.getCreatedAt(),
            announcement.getUpdatedAt()
        );
    }
}

