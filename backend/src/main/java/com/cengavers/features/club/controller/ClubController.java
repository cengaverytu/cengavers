package com.cengavers.features.club.controller;

import com.cengavers.features.club.dto.request.CreateClubRequest;
import com.cengavers.features.club.dto.request.CreateClubRoleRequest;
import com.cengavers.features.club.dto.response.ClubMemberResponse;
import com.cengavers.features.club.dto.response.ClubResponse;
import com.cengavers.features.club.dto.response.ClubRoleResponse;
import com.cengavers.features.club.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/club")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @PostMapping
    public ResponseEntity<ClubResponse> createClub(@RequestBody CreateClubRequest request) {
        return ResponseEntity.ok(clubService.createClub(request));
    }

    @GetMapping
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/my-joined")
    public ResponseEntity<List<ClubResponse>> getJoinedClubs() {
        return ResponseEntity.ok(clubService.getJoinedClubs());
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<Void> joinClub(@PathVariable Long id) {
        clubService.joinClub(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<Void> leaveClub(@PathVariable Long id) {
        clubService.leaveClub(id);
        return ResponseEntity.ok().build();
    }

}

