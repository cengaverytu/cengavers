import { useState } from "react";
import { useActiveAnnouncements } from "../../features/announcement/hooks/useAnnouncement";
import { AnnouncementDTO } from "../../features/announcement/types/announcement";
import AnnouncementGridList from "../../features/announcement/components/AnnouncementGridList";
import AnnouncementDetailModal from "../../features/announcement/components/AnnouncementDetailModal";

export default function UserAnnouncementsPage() {
    const { data: announcements, isLoading, error } = useActiveAnnouncements();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementDTO | null>(null);
    const [activeTab, setActiveTab] = useState<"system" | "club" | "event">("system");

    // Filtreleme
    const getFilteredAnnouncements = (): AnnouncementDTO[] => {
        const all = announcements || [];
        switch (activeTab) {
            case "system":
                // Admin duyuruları (clubId yok)
                return all.filter((a: AnnouncementDTO) => !a.clubId && !a.eventId);
            case "club":
                // Kulüp duyuruları (clubId var, eventId yok)
                return all.filter((a: AnnouncementDTO) => a.clubId && !a.eventId);
            case "event":
                // Etkinlik duyuruları (clubId ve eventId var)
                return all.filter((a: AnnouncementDTO) => a.clubId && a.eventId);
            default:
                return all;
        }
    };

    const filteredAnnouncements = getFilteredAnnouncements();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Duyurular</h1>
                <p className="text-gray-600 text-center">
                    Kulüplerimizden ve etkinliklerimizden haberdar olun
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab("system")}
                        className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "system"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Sistem Duyuruları
                    </button>
                    <button
                        onClick={() => setActiveTab("club")}
                        className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "club"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Kulüp Duyuruları
                    </button>
                    <button
                        onClick={() => setActiveTab("event")}
                        className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "event"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Etkinlik Duyuruları
                    </button>
                </nav>
            </div>

            {/* Duyuru Listesi */}
            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-medium">Duyurular yüklenirken bir hata oluştu</p>
                </div>
            ) : (
                <AnnouncementGridList
                    announcements={filteredAnnouncements}
                    loading={isLoading}
                    emptyMessage={
                        activeTab === "system" 
                            ? "Şu an sistem duyurusu bulunmamaktadır." 
                            : activeTab === "club"
                            ? "Şu an kulüp duyurusu bulunmamaktadır."
                            : "Şu an etkinlik duyurusu bulunmamaktadır."
                    }
                    onClick={(announcement) => setSelectedAnnouncement(announcement)}
                />
            )}

            <AnnouncementDetailModal
                announcement={selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
            />
        </div>
    );
}

