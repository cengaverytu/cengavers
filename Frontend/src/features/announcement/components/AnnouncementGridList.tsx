import { AnnouncementDTO } from "../types/announcement";
import AnnouncementCard from "./AnnouncementCard";

interface AnnouncementGridListProps {
    announcements: AnnouncementDTO[];
    loading?: boolean;
    emptyMessage?: string;
    onEdit?: (announcement: AnnouncementDTO) => void;
    onDelete?: (id: number) => void;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    onClick?: (announcement: AnnouncementDTO) => void;
    showActions?: boolean;
    showAdminActions?: boolean;
}

export default function AnnouncementGridList({
    announcements,
    loading = false,
    emptyMessage = "Henüz duyuru bulunmuyor.",
    onEdit,
    onDelete,
    onApprove,
    onReject,
    onClick,
    showActions = false,
    showAdminActions = false,
}: AnnouncementGridListProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!announcements || announcements.length === 0) {
        return (
            <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
                <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onApprove={onApprove}
                    onReject={onReject}
                    onClick={onClick}
                    showActions={showActions}
                    showAdminActions={showAdminActions}
                />
            ))}
        </div>
    );
}

