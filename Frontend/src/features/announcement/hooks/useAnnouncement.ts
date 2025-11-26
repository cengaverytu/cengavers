import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnnouncementDTO, CreateAnnouncementInput, UpdateAnnouncementInput } from "../types/announcement";
import { createAnnouncement, deleteAnnouncement, findAll, findAllActive, findById, updateAnnouncement } from "../api/announcementApi";

const QK = {
    announcementsAll: ["announcements"] as const,
    announcementsActive: ["announcements", "active"] as const,
    announcement: (id: number) => ["announcement", id] as const,
};

export function useAnnouncements() {
    return useQuery<AnnouncementDTO[]>({
        queryKey: QK.announcementsAll,
        queryFn: findAll,
        staleTime: 60_000
    });
}

export function useActiveAnnouncements() {
    return useQuery<AnnouncementDTO[]>({
        queryKey: QK.announcementsActive,
        queryFn: findAllActive,
        staleTime: 60_000
    });
}

export function useAnnouncement(id: number) {
    return useQuery<AnnouncementDTO>({
        queryKey: QK.announcement(id),
        queryFn: () => findById(id),
        enabled: !!id,
        staleTime: 60_000
    });
}

export function useCreateAnnouncement() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: CreateAnnouncementInput) => createAnnouncement(input),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QK.announcementsAll });
            qc.invalidateQueries({ queryKey: QK.announcementsActive });
        }
    });
}

export function useUpdateAnnouncement() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (vars: { id: number; input: UpdateAnnouncementInput }) => 
            updateAnnouncement(vars.id, vars.input),
        onSuccess: (_, vars) => {
            qc.invalidateQueries({ queryKey: QK.announcementsAll });
            qc.invalidateQueries({ queryKey: QK.announcementsActive });
            qc.invalidateQueries({ queryKey: QK.announcement(vars.id) });
        }
    });
}

export function useDeleteAnnouncement() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteAnnouncement(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QK.announcementsAll });
            qc.invalidateQueries({ queryKey: QK.announcementsActive });
        }
    });
}

