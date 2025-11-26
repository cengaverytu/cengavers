package com.cengavers.features.announcement.repository;

import com.cengavers.features.announcement.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findAllByOrderByCreatedAtDesc();
    List<Announcement> findByStatusTrueOrderByCreatedAtDesc();
}

