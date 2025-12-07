import { http } from "../../../lib/http";
import { 
    ClubResponse, 
    CreateClubRequest
} from "../types/club";

export async function createClub(data: CreateClubRequest): Promise<ClubResponse> {
    const res = await http.post<ClubResponse>("/club", data);
    return res.data;
}

