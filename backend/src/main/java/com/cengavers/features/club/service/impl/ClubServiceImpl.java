package com.cengavers.features.club.service.impl;

import com.cengavers.features.club.dto.request.CreateClubRequest;
import com.cengavers.features.club.dto.request.CreateClubRoleRequest;
import com.cengavers.features.club.dto.response.ClubMemberResponse;
import com.cengavers.features.club.dto.response.ClubResponse;
import com.cengavers.features.club.dto.response.ClubRoleResponse;
import com.cengavers.features.club.entity.*;
import com.cengavers.features.club.repository.ClubMemberRepository;
import com.cengavers.features.club.repository.ClubRepository;
import com.cengavers.features.club.repository.ClubRoleRepository;
import com.cengavers.features.club.service.ClubService;
import com.cengavers.features.user.dto.UserDTO;
import com.cengavers.features.user.entity.User;
import com.cengavers.features.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final ClubRoleRepository clubRoleRepository;
    private final UserService userService;

    private User getCurrentUserEntity() {
        UserDTO currentUserDto = userService.getCurrentUser();
        return userService.findByUsernameReturnUser(currentUserDto.getUsername());
    }

    @Override
    @Transactional
    public ClubResponse createClub(CreateClubRequest request) {
        if (clubRepository.existsByName(request.getName())) {
            throw new RuntimeException("Club name already exists");
        }
        User currentUser = getCurrentUserEntity();
        Club club = new Club();
        club.setName(request.getName());
        club.setDescription(request.getDescription());
        club.setOwner(currentUser);
        club.setStatus(ClubStatus.PENDING);
        Club saved = clubRepository.save(club);
        return mapToClubResponse(saved);
    }

    @Override
    public List<ClubResponse> getAllClubs() {
        User currentUser = getCurrentUserEntity();
        
        // Get all memberships of the current user
        java.util.Map<Long, MembershipStatus> membershipMap = clubMemberRepository.findByUserId(currentUser.getId()).stream()
                .collect(Collectors.toMap(m -> m.getClub().getId(), ClubMember::getStatus));

        return clubRepository.findAll().stream()
                .map(club -> {
                    ClubResponse response = mapToClubResponse(club);
                    response.setCurrentUserStatus(membershipMap.get(club.getId()));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ClubResponse> getJoinedClubs() {
        User currentUser = getCurrentUserEntity();
        return clubMemberRepository.findByUserId(currentUser.getId()).stream()
                .filter(m -> m.getStatus() == MembershipStatus.APPROVED)
                .map(m -> {
                     ClubResponse response = mapToClubResponse(m.getClub());
                     response.setCurrentUserStatus(MembershipStatus.APPROVED);
                     return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void joinClub(Long clubId) {
        User currentUser = getCurrentUserEntity();
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        
        if (club.getStatus() != ClubStatus.APPROVED) {
             throw new RuntimeException("Cannot join a club that is not approved");
        }

        if (clubMemberRepository.findByClubIdAndUserId(clubId, currentUser.getId()).isPresent()) {
            throw new RuntimeException("Already a member or requested");
        }

        ClubMember member = new ClubMember();
        member.setClub(club);
        member.setUser(currentUser);
        member.setStatus(MembershipStatus.PENDING);
        clubMemberRepository.save(member);
    }

    @Override
    public void leaveClub(Long clubId) {
        User currentUser = getCurrentUserEntity();
        ClubMember member = clubMemberRepository.findByClubIdAndUserId(clubId, currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Not a member"));
        clubMemberRepository.delete(member);
    }

    private ClubResponse mapToClubResponse(Club club) {
        return ClubResponse.builder()
                .id(club.getId())
                .name(club.getName())
                .description(club.getDescription())
                .status(club.getStatus())
                .ownerUsername(club.getOwner().getUsername())
                .createdAt(club.getCreatedAt())
                .memberCount(clubMemberRepository.findByClubIdAndStatus(club.getId(), MembershipStatus.APPROVED).size())
                .build();
    }
}

