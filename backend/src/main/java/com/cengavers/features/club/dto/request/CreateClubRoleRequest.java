package com.cengavers.features.club.dto.request;

import lombok.Data;

@Data
public class CreateClubRoleRequest {
    private String name;
    private Long clubId;
    private boolean isAdmin;
}

