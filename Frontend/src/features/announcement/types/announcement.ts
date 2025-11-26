import { z } from "zod";

export const createAnnouncementSchema = z.object({
    title: z.string().min(1, "Başlık gereklidir").max(200, "Başlık en fazla 200 karakter olabilir"),
    description: z.string().min(1, "Açıklama gereklidir").max(2000, "Açıklama en fazla 2000 karakter olabilir"),
    imageUrl: z.string().max(500, "Resim URL'si en fazla 500 karakter olabilir").optional(),
    status: z.boolean().default(true),
});

export const updateAnnouncementSchema = z.object({
    title: z.string().max(200, "Başlık en fazla 200 karakter olabilir").optional(),
    description: z.string().max(2000, "Açıklama en fazla 2000 karakter olabilir").optional(),
    imageUrl: z.string().max(500, "Resim URL'si en fazla 500 karakter olabilir").optional(),
    status: z.boolean().optional(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;

export type AnnouncementDTO = {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    status: boolean;
    createdAt: string;
    updatedAt?: string;
};

