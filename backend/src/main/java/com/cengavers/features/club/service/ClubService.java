package com.cengavers.features.club.service;

import com.cengavers.features.club.dto.request.CreateClubRequest;
import com.cengavers.features.club.dto.request.CreateClubRoleRequest;
import com.cengavers.features.club.dto.response.ClubMemberResponse;
import com.cengavers.features.club.dto.response.ClubResponse;
import com.cengavers.features.club.dto.response.ClubRoleResponse;

import java.util.List;

public interface ClubService {
    ClubResponse createClub(CreateClubRequest request);
    ClubResponse approveClub(Long clubId);
    void rejectClub(Long clubId);
    List<ClubResponse> getAllClubs();
    List<ClubResponse> getJoinedClubs();

    void joinClub(Long clubId);
    void approveMembership(Long memberId);
    void rejectMembership(Long memberId);
    void leaveClub(Long clubId);
}

