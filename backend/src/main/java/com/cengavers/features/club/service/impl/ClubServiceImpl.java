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
}

