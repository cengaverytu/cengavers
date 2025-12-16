import { useState } from "react";
import { useApprovedEvents, useEvent } from "../../features/event/hooks/useEvent";
import EventList from "../../features/event/components/EventList";
import EventDetailModal from "../../features/event/components/EventDetailModal";
import { EventResponse } from "../../features/event/types/event";

export default function PublicEventsPage() {
    const { data: events, isLoading } = useApprovedEvents();
    const { joinEvent, leaveEvent, isJoining, isLeaving } = useEvent();
    
    const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);

    const handleJoin = async (id: number) => {
        try {
            await joinEvent(id);
            alert("Etkinliğe başarıyla katıldınız!");
        } catch (error: any) {
            console.error("Katılma hatası:", error);
            alert(error.response?.data?.message || "Etkinliğe katılırken bir hata oluştu");
        }
    };

    const handleLeave = async (id: number) => {
        if (!confirm("Etkinlikten ayrılmak istediğinize emin misiniz?")) return;
        try {
            await leaveEvent(id);
            alert("Etkinlikten ayrıldınız");
        } catch (error: any) {
            console.error("Ayrılma hatası:", error);
            alert(error.response?.data?.message || "Etkinlikten ayrılırken bir hata oluştu");
        }
    };

    const handleDetailClick = (event: EventResponse) => {
        setSelectedEvent(event);
        setDetailModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Etkinlikler</h1>
                <p className="text-gray-600">Yaklaşan ve güncel etkinliklere göz atın ve katılın!</p>
            </div>

            <EventList
                events={events || []}
                loading={isLoading || isJoining || isLeaving}
                emptyMessage="Henüz onaylanmış etkinlik bulunmuyor."
                onJoin={handleJoin}
                onLeave={handleLeave}
                onClick={handleDetailClick}
                showParticipation={true}
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




