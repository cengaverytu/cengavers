import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
    getAllClubs, 
    getJoinedClubs, 
    createClub, 
    joinClub, 
    leaveClub,
    approveClub,
    rejectClub,
    approveMembership,
    rejectMembership
} from "../api/clubApi";
import { CreateClubRequest } from "../types/club";

const CLUB_KEYS = {
    all: ["clubs"] as const,
    myJoined: ["clubs", "my-joined"] as const,
};

export function useClubs() {
    return useQuery({
        queryKey: CLUB_KEYS.all,
        queryFn: getAllClubs,
    });
}

export function useJoinedClubs() {
    return useQuery({
        queryKey: CLUB_KEYS.myJoined,
        queryFn: getJoinedClubs,
    });
}

export function useCreateClub() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateClubRequest) => createClub(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CLUB_KEYS.all });
        },
    });
}

export function useJoinClub() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => joinClub(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CLUB_KEYS.myJoined });
            qc.invalidateQueries({ queryKey: CLUB_KEYS.all });
        },
    });
}

export function useLeaveClub() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => leaveClub(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CLUB_KEYS.myJoined });
        },
    });
}

export function useApproveMembership() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => approveMembership(id),
        onSuccess: () => {
             qc.invalidateQueries({ queryKey: ["clubs"] }); 
        },
    });
}

export function useRejectMembership() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => rejectMembership(id),
        onSuccess: () => {
             qc.invalidateQueries({ queryKey: ["clubs"] });
        },
    });
}


export function useApproveClub() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => approveClub(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CLUB_KEYS.all });
        },
    });
}

export function useRejectClub() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => rejectClub(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CLUB_KEYS.all });
        },
    });
}
