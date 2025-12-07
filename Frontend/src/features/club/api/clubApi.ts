import { http } from "../../../lib/http";
import { 
    ClubResponse, 
    CreateClubRequest
} from "../types/club";

export async function createClub(data: CreateClubRequest): Promise<ClubResponse> {
    const res = await http.post<ClubResponse>("/club", data);
    return res.data;
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

export async function leaveClub(id: number): Promise<void> {
    await http.delete<void>(`/club/${id}/leave`);
}