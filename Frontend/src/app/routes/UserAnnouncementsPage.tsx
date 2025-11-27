import { useState } from "react";
import { useActiveAnnouncements } from "../../features/announcement/hooks/useAnnouncement";
import { AnnouncementDTO } from "../../features/announcement/types/announcement";
import AnnouncementCard from "../../features/announcement/components/AnnouncementCard";
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

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-gray-600">Yükleniyor...</div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Duyurular yüklenirken bir hata oluştu
                </div>
            ) : announcements && announcements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            onClick={() => setSelectedAnnouncement(announcement)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">Henüz aktif duyuru bulunmamaktadır.</p>
                </div>
            )}

            {/* Duyuru Detay Modal */}
            <AnnouncementDetailModal
                announcement={selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
            />
        </div>
    );
}

