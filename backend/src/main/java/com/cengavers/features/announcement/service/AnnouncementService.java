package com.cengavers.features.announcement.service;

import com.cengavers.features.announcement.dto.AnnouncementDTO;
import com.cengavers.features.announcement.dto.CreateAnnouncementRequest;
import com.cengavers.features.announcement.dto.UpdateAnnouncementRequest;

import java.util.List;

public interface AnnouncementService {
    
    AnnouncementDTO create(CreateAnnouncementRequest request);
    
    AnnouncementDTO update(Long id, UpdateAnnouncementRequest request);
    
    AnnouncementDTO findById(Long id);
    
    List<AnnouncementDTO> findAll();
    
    List<AnnouncementDTO> findAllActive();
    
    void deleteById(Long id);
}

