import { http } from "../../../lib/http";
import { 
    ClubResponse, 
    CreateClubRequest
} from "../types/club";

export async function createClub(data: CreateClubRequest): Promise<ClubResponse> {
    const res = await http.post<ClubResponse>("/club", data);
    return res.data;
}

export async function approveClub(id: number): Promise<ClubResponse> {
    const res = await http.put<ClubResponse>(`/club/${id}/approve`);
    return res.data;
}

export async function rejectClub(id: number): Promise<void> {
    await http.put<void>(`/club/${id}/reject`);
}

export async function getAllClubs(): Promise<ClubResponse[]> {
    const res = await http.get<ClubResponse[]>("/club");
    return res.data;
}

export async function getJoinedClubs(): Promise<ClubResponse[]> {
    const res = await http.get<ClubResponse[]>("/club/my-joined");
    return res.data;
}

export async function joinClub(id: number): Promise<void> {
    await http.post<void>(`/club/${id}/join`);
}

export async function approveMembership(id: number): Promise<void> {
    await http.post<void>(`/club/member/${id}/approve`);
}

export async function rejectMembership(id: number): Promise<void> {
    await http.post<void>(`/club/member/${id}/reject`);
}

export async function leaveClub(id: number): Promise<void> {
    await http.delete<void>(`/club/${id}/leave`);
}