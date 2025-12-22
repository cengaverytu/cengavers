import { useState } from "react";
import { 
    usePendingAnnouncements, 
    useDeleteAnnouncement, 
    useCreateAnnouncement, 
    useUpdateAnnouncement,
    useApproveAnnouncement,
    useRejectAnnouncement
} from "../hooks/useAnnouncement";
import { AnnouncementDTO, CreateAnnouncementInput, UpdateAnnouncementInput } from "../types/announcement";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementGridList from "./AnnouncementGridList";
import Modal from "../../../components/ui/Modal";
import { useNavigate } from "react-router";

export default function AnnouncementList() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementDTO | null>(null);
    
    const { data: announcements, isLoading } = usePendingAnnouncements();
    const { mutateAsync: deleteAnnouncement } = useDeleteAnnouncement();
    const { mutateAsync: createAnnouncement, isPending: isCreating } = useCreateAnnouncement();
    const { mutateAsync: updateAnnouncement, isPending: isUpdating } = useUpdateAnnouncement();
    const { mutateAsync: approveAnnouncement } = useApproveAnnouncement();
    const { mutateAsync: rejectAnnouncement } = useRejectAnnouncement();

    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        if (window.confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
            try {
                await deleteAnnouncement(id);
                alert("Duyuru başarıyla silindi");
            } catch (error) {
                console.error("Duyuru silinirken hata oluştu:", error);
                alert("Duyuru silinirken bir hata oluştu");
            }
        }
    };

    const handleCreate = async (values: CreateAnnouncementInput) => {
        try {
            await createAnnouncement(values);
            setIsCreateModalOpen(false);
            alert("Duyuru başarıyla oluşturuldu");
        } catch (error) {
            console.error("Duyuru oluşturulurken hata oluştu:", error);
            alert("Duyuru oluşturulurken bir hata oluştu");
        }
    };

    const handleUpdate = async (values: UpdateAnnouncementInput) => {
        if (!editingAnnouncement) return;
        
        try {
            await updateAnnouncement({
                id: editingAnnouncement.id,
                input: values,
            });
            setEditingAnnouncement(null);
            alert("Duyuru başarıyla güncellendi");
        } catch (error) {
            console.error("Duyuru güncellenirken hata oluştu:", error);
            alert("Duyuru güncellenirken bir hata oluştu");
        }
    };

    const handleApprove = async (id: number) => {
        if (!confirm("Bu duyuruyu onaylamak istediğinize emin misiniz?")) return;
        try {
            await approveAnnouncement(id);
            alert("Duyuru onaylandı!");
        } catch (error: any) {
            console.error("Onaylama hatası:", error);
            alert(error.response?.data?.message || "Duyuru onaylanırken bir hata oluştu");
        }
    };

    const handleReject = async (id: number) => {
        if (!confirm("Bu duyuruyu reddetmek istediğinize emin misiniz?")) return;
        try {
            await rejectAnnouncement(id);
            alert("Duyuru reddedildi");
        } catch (error: any) {
            console.error("Reddetme hatası:", error);
            alert(error.response?.data?.message || "Duyuru reddedilirken bir hata oluştu");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Duyuru Yönetimi</h1>
                    <p className="text-gray-600 mt-1">Bekleyen duyuru taleplerini onaylayın veya reddedin</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate("/admin")}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        ← Admin Paneline Dön
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Admin Duyurusu Oluştur
                    </button>
                </div>
            </div>

            <AnnouncementGridList
                announcements={announcements || []}
                loading={isLoading}
                emptyMessage="Bekleyen duyuru talebi bulunmuyor."
                onEdit={setEditingAnnouncement}
                onDelete={handleDelete}
                onApprove={handleApprove}
                onReject={handleReject}
                showAdminActions={true}
            />

            {/* Create Modal - Admin Duyurusu */}
            <Modal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Yeni Admin Duyurusu Oluştur"
            >
                <AnnouncementForm
                    mode="create"
                    isAdminMode={true}
                    onSubmit={handleCreate}
                    submitLabel={isCreating ? "Oluşturuluyor..." : "Oluştur"}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                open={!!editingAnnouncement}
                onClose={() => setEditingAnnouncement(null)}
                title="Duyuru Düzenle"
            >
                {editingAnnouncement && (
                    <AnnouncementForm
                        mode="update"
                        onSubmit={handleUpdate}
                        submitLabel={isUpdating ? "Güncelleniyor..." : "Güncelle"}
                        defaultValues={{
                            title: editingAnnouncement.title,
                            description: editingAnnouncement.description,
                            detailsMarkdown: editingAnnouncement.detailsMarkdown,
                            imageUrl: editingAnnouncement.imageUrl,
                            eventId: editingAnnouncement.eventId,
                            isActive: editingAnnouncement.isActive,
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}
