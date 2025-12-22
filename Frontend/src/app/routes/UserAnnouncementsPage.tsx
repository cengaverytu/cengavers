import { useState } from "react";
import { useActiveAnnouncements } from "../../features/announcement/hooks/useAnnouncement";
import { AnnouncementDTO } from "../../features/announcement/types/announcement";
import AnnouncementGridList from "../../features/announcement/components/AnnouncementGridList";
import AnnouncementDetailModal from "../../features/announcement/components/AnnouncementDetailModal";

export default function UserAnnouncementsPage() {
    const { data: announcements, isLoading, error } = useActiveAnnouncements();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementDTO | null>(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Duyurular</h1>
                <p className="text-gray-600 text-center">
                    Kulüplerimizden ve etkinliklerimizden haberdar olun
                </p>
            </div>

            <AnnouncementGridList
                announcements={announcements || []}
                loading={isLoading}
                emptyMessage={error ? "Duyurular yüklenirken bir hata oluştu" : "Henüz aktif duyuru bulunmamaktadır."}
                onClick={(announcement) => setSelectedAnnouncement(announcement)}
            />

            <AnnouncementDetailModal
                announcement={selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
            />
        </div>
    );
}

