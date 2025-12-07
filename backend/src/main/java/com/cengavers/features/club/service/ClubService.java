package com.cengavers.features.club.service;

import com.cengavers.features.club.dto.request.CreateClubRequest;
import com.cengavers.features.club.dto.request.CreateClubRoleRequest;
import com.cengavers.features.club.dto.response.ClubMemberResponse;
import com.cengavers.features.club.dto.response.ClubResponse;
import com.cengavers.features.club.dto.response.ClubRoleResponse;

import java.util.List;

public interface ClubService {
    ClubResponse createClub(CreateClubRequest request);
}

