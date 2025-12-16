import { useState } from "react";
import { useManagedClubs } from "../../features/club/hooks/useClub";
import { useMyClubEvents, useEvent } from "../../features/event/hooks/useEvent";
import ClubManager from "../../features/club/components/ClubManager";
import Modal from "../../components/ui/Modal";
import EventForm from "../../features/event/components/EventForm";
import EventList from "../../features/event/components/EventList";
import EventDetailModal from "../../features/event/components/EventDetailModal";
import { CreateEventInput, EventResponse, UpdateEventInput } from "../../features/event/types/event";

export default function ClubManagementPage() {
    const { data: managedClubs, isLoading: loadingClubs } = useManagedClubs();
    const { data: myEvents, isLoading: loadingEvents } = useMyClubEvents();
    const { createEvent, updateEvent, deleteEvent, isCreating, isUpdating } = useEvent();

    const [activeTab, setActiveTab] = useState<"clubs" | "events">("clubs");
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null);
    const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

    const handleCreateEvent = async (data: CreateEventInput) => {
        try {
            await createEvent(data);
            setCreateModalOpen(false);
            setSelectedClubId(null);
        } catch (error) {
            console.error("Etkinlik oluşturulurken hata oluştu:", error);
            alert("Etkinlik oluşturulurken hata oluştu");
        }
    };

    const handleUpdateEvent = async (data: UpdateEventInput) => {
        if (!selectedEvent) return;
        try {
            await updateEvent(selectedEvent.id, data);
            setEditModalOpen(false);
            setSelectedEvent(null);
        } catch (error) {
            console.error("Etkinlik güncellenirken hata oluştu:", error);
            alert("Etkinlik güncellenirken hata oluştu");
        }
    };

    const handleDeleteEvent = async (id: number) => {
        if (!confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) return;
        try {
            await deleteEvent(id);
        } catch (error) {
            console.error("Etkinlik silinirken hata oluştu:", error);
            alert("Etkinlik silinirken hata oluştu");
        }
    };

    const handleEditClick = (event: EventResponse) => {
        setSelectedEvent(event);
        setEditModalOpen(true);
    };

    const handleDetailClick = (event: EventResponse) => {
        setSelectedEvent(event);
        setDetailModalOpen(true);
    };

    const handleCreateClick = (clubId: number) => {
        setSelectedClubId(clubId);
        setCreateModalOpen(true);
    };

    if (loadingClubs) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!managedClubs || managedClubs.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Kulüp Yönetimi</h2>
                    <p className="text-gray-600">
                        Henüz yönettiğiniz bir kulüp bulunmuyor. Kulüp oluşturmak için Kulüpler sayfasını ziyaret edin.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Kulüp Yönetimi</h1>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab("clubs")}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                            ${activeTab === "clubs"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }
                        `}
                    >
                        Kulüp & Üye Yönetimi
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                            ${activeTab === "events"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }
                        `}
                    >
                        Etkinlik Yönetimi
                    </button>
                </nav>
            </div>

            {/* Kulüp & Üye Yönetimi Tab */}
            {activeTab === "clubs" && (
                <div className="space-y-8">
                    {managedClubs.map((club) => (
                        <ClubManager key={club.id} club={club} />
                    ))}
                </div>
            )}

            {/* Etkinlik Yönetimi Tab */}
            {activeTab === "events" && (
                <div>
                    {/* Kulüp Kartları - Etkinlik Oluşturma */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Etkinlik Oluştur</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {managedClubs.map((club) => (
                                <div key={club.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-100 hover:border-indigo-300 transition-all hover:shadow-lg">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{club.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{club.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {club.memberCount} üye
                                        </div>
                                        <button
                                            onClick={() => handleCreateClick(club.id)}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Etkinlik Oluştur
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Oluşturulan Etkinlikler */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Oluşturduğum Etkinlikler</h2>
                        <EventList
                            events={myEvents || []}
                            loading={loadingEvents}
                            emptyMessage="Henüz etkinlik oluşturmadınız. Yukarıdan bir kulüp seçerek etkinlik oluşturabilirsiniz."
                            onEdit={handleEditClick}
                            onDelete={handleDeleteEvent}
                            onClick={handleDetailClick}
                            showActions={true}
                        />
                    </div>
                </div>
            )}

            {/* Etkinlik Oluşturma Modal */}
            <Modal
                open={isCreateModalOpen}
                onClose={() => {
                    setCreateModalOpen(false);
                    setSelectedClubId(null);
                }}
                title="Yeni Etkinlik Oluştur"
            >
                <EventForm
                    mode="create"
                    clubId={selectedClubId || undefined}
                    onSubmit={handleCreateEvent}
                    submitLabel={isCreating ? "Oluşturuluyor..." : "Etkinlik Oluştur"}
                />
            </Modal>

            {/* Etkinlik Düzenleme Modal */}
            <Modal
                open={isEditModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedEvent(null);
                }}
                title="Etkinliği Düzenle"
            >
                {selectedEvent && (
                    <EventForm
                        mode="update"
                        defaultValues={{
                            title: selectedEvent.title,
                            description: selectedEvent.description,
                            detailsMarkdown: selectedEvent.detailsMarkdown,
                            eventDate: selectedEvent.eventDate,
                            location: selectedEvent.location,
                            capacity: selectedEvent.capacity,
                            imageUrl: selectedEvent.imageUrl,
                        }}
                        onSubmit={handleUpdateEvent}
                        submitLabel={isUpdating ? "Güncelleniyor..." : "Güncelle"}
                    />
                )}
            </Modal>

            {/* Etkinlik Detay Modal */}
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
