import { EventResponse } from "../types/event";
import EventCard from "./EventCard";

interface EventListProps {
    events: EventResponse[];
    loading?: boolean;
    emptyMessage?: string;
    onEdit?: (event: EventResponse) => void;
    onDelete?: (id: number) => void;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    onJoin?: (id: number) => void;
    onLeave?: (id: number) => void;
    onClick?: (event: EventResponse) => void;
    showActions?: boolean;
    showAdminActions?: boolean;
    showParticipation?: boolean;
}

export default function EventList({
    events,
    loading = false,
    emptyMessage = "Henüz etkinlik bulunmuyor.",
    onEdit,
    onDelete,
    onApprove,
    onReject,
    onJoin,
    onLeave,
    onClick,
    showActions = false,
    showAdminActions = false,
    showParticipation = false,
}: EventListProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!events || events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onApprove={onApprove}
                    onReject={onReject}
                    onJoin={onJoin}
                    onLeave={onLeave}
                    onClick={onClick}
                    showActions={showActions}
                    showAdminActions={showAdminActions}
                    showParticipation={showParticipation}
                />
            ))}
        </div>
    );
}

