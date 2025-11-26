package com.cengavers.features.announcement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Table(name = "ANNOUNCEMENTS")
@NoArgsConstructor
@Entity
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false, unique = true)
    private Long id;

    @Column(name = "TITLE", nullable = false, length = 200)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false, length = 2000)
    private String description;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Column(name = "STATUS", nullable = false)
    private Boolean status = true;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

