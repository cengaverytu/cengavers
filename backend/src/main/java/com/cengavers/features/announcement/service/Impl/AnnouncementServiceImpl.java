package com.cengavers.features.announcement.service.Impl;

import com.cengavers.features.announcement.dto.AnnouncementDTO;
import com.cengavers.features.announcement.dto.CreateAnnouncementRequest;
import com.cengavers.features.announcement.dto.UpdateAnnouncementRequest;
import com.cengavers.features.announcement.dto.converter.AnnouncementDTOConverter;
import com.cengavers.features.announcement.entity.Announcement;
import com.cengavers.features.announcement.repository.AnnouncementRepository;
import com.cengavers.features.announcement.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementDTOConverter announcementDTOConverter;

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AnnouncementDTO create(CreateAnnouncementRequest request) {
        Announcement announcement = new Announcement();
        announcement.setTitle(request.getTitle());
        announcement.setDescription(request.getDescription());
        announcement.setImageUrl(request.getImageUrl());
        announcement.setStatus(request.getStatus());
        
        Announcement saved = announcementRepository.save(announcement);
        return announcementDTOConverter.convert(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AnnouncementDTO update(Long id, UpdateAnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        
        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            announcement.setTitle(request.getTitle());
        }
        if (request.getDescription() != null && !request.getDescription().isBlank()) {
            announcement.setDescription(request.getDescription());
        }
        if (request.getImageUrl() != null) {
            announcement.setImageUrl(request.getImageUrl());
        }
        if (request.getStatus() != null) {
            announcement.setStatus(request.getStatus());
        }
        
        Announcement updated = announcementRepository.save(announcement);
        return announcementDTOConverter.convert(updated);
    }

    @Override
    public AnnouncementDTO findById(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        return announcementDTOConverter.convert(announcement);
    }

    @Override
    public List<AnnouncementDTO> findAll() {
        return announcementRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(announcementDTOConverter::convert)
                .collect(Collectors.toList());
    }

    @Override
    public List<AnnouncementDTO> findAllActive() {
        return announcementRepository.findByStatusTrueOrderByCreatedAtDesc()
                .stream()
                .map(announcementDTOConverter::convert)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public void deleteById(Long id) {
        if (!announcementRepository.existsById(id)) {
            throw new RuntimeException("Announcement not found with id: " + id);
        }
        announcementRepository.deleteById(id);
    }
}

