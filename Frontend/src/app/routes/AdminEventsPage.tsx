import { useState } from "react";
import { usePendingEvents, useEvent } from "../../features/event/hooks/useEvent";
import EventList from "../../features/event/components/EventList";
import EventDetailModal from "../../features/event/components/EventDetailModal";
import { EventResponse } from "../../features/event/types/event";

export default function AdminEventsPage() {
    const { data: events, isLoading } = usePendingEvents();
    const { approveEvent, rejectEvent, isApproving, isRejecting } = useEvent();
    
    const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);

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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Etkinlik Yönetimi</h1>
                <p className="text-gray-600">Kulüp yetkilileri tarafından oluşturulan etkinlik taleplerini onaylayın veya reddedin.</p>
            </div>

                <EventList
                    events={events || []}
                    loading={isLoading || isApproving || isRejecting}
                    emptyMessage="Bekleyen etkinlik talebi bulunmuyor."
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

