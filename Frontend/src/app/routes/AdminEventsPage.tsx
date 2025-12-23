import { useState } from "react";
import { usePendingEvents, useEvents, useEvent } from "../../features/event/hooks/useEvent";
import EventList from "../../features/event/components/EventList";
import EventDetailModal from "../../features/event/components/EventDetailModal";
import { EventResponse } from "../../features/event/types/event";
import { useNavigate } from "react-router-dom";

export default function AdminEventsPage() {
    const { data: allEvents, isLoading: loadingAll } = useEvents();
    const { data: pendingEvents, isLoading: loadingPending } = usePendingEvents();
    const { approveEvent, rejectEvent, isApproving, isRejecting } = useEvent();
    
    const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
    const navigate = useNavigate();

    const handleApprove = async (id: number) => {
        if (!confirm("Bu etkinliği onaylamak istediğinize emin misiniz?")) return;
        try {
            await approveEvent(id);
            alert("Etkinlik onaylandı!");
        } catch (error: any) {
            console.error("Onaylama hatası:", error);
            alert(error.response?.data?.message || "Etkinlik onaylanırken bir hata oluştu");
        }
    };

    const handleReject = async (id: number) => {
        if (!confirm("Bu etkinliği reddetmek istediğinize emin misiniz?")) return;
        try {
            await rejectEvent(id);
            alert("Etkinlik reddedildi");
        } catch (error: any) {
            console.error("Reddetme hatası:", error);
            alert(error.response?.data?.message || "Etkinlik reddedilirken bir hata oluştu");
        }
    };

    const handleDetailClick = (event: EventResponse) => {
        setSelectedEvent(event);
        setDetailModalOpen(true);
    };

    // Filtreleme
    const getFilteredEvents = (): EventResponse[] => {
        const all = allEvents || [];
        switch (activeTab) {
            case "pending":
                return pendingEvents || [];
            case "approved":
                return all.filter((e: EventResponse) => e.status === "APPROVED");
            case "rejected":
                return all.filter((e: EventResponse) => e.status === "REJECTED");
            case "all":
                return all;
            default:
                return pendingEvents || [];
        }
    };

    const filteredEvents = getFilteredEvents();
    const isLoading = activeTab === "pending" ? loadingPending : loadingAll;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Etkinlik Yönetimi</h1>
                        <p className="text-gray-600 mt-1">Kulüp yetkilileri tarafından oluşturulan etkinlik taleplerini onaylayın veya reddedin</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin")}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        ← Admin Paneline Dön
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "pending"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Bekleyen Talepler
                        {pendingEvents && pendingEvents.length > 0 && (
                            <span className="ml-2 bg-indigo-100 text-indigo-800 py-0.5 px-2 rounded-full text-xs font-semibold">
                                {pendingEvents.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("approved")}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "approved"
                                ? "border-emerald-500 text-emerald-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Onaylanan Etkinlikler
                    </button>
                    <button
                        onClick={() => setActiveTab("rejected")}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "rejected"
                                ? "border-red-500 text-red-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Reddedilen Etkinlikler
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "all"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Tümü
                    </button>
                </nav>
            </div>

            {/* Etkinlik Listesi */}
            <EventList
                events={filteredEvents}
                loading={isLoading || isApproving || isRejecting}
                emptyMessage={
                    activeTab === "pending" ? "Şu an bekleyen etkinlik talebi bulunmamaktadır." :
                    activeTab === "approved" ? "Şu an onaylanmış etkinlik bulunmamaktadır." :
                    activeTab === "rejected" ? "Şu an reddedilmiş etkinlik bulunmamaktadır." :
                    "Şu an hiç etkinlik bulunmamaktadır."
                }
                onApprove={handleApprove}
                onReject={handleReject}
                onClick={handleDetailClick}
                showAdminActions={true}
            />

            <EventDetailModal
                event={selectedEvent}
                open={isDetailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedEvent(null);
                }}
            />
        </div>
    );
}

