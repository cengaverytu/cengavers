import { useState } from "react";
import { useAnnouncements, useDeleteAnnouncement, useCreateAnnouncement, useUpdateAnnouncement } from "../hooks/useAnnouncement";
import { AnnouncementDTO, CreateAnnouncementInput, UpdateAnnouncementInput } from "../types/announcement";
import AnnouncementForm from "./AnnouncementForm";
import Modal from "../../../components/ui/Modal";
import { useNavigate } from "react-router";
export default function AnnouncementList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementDTO | null>(null);
    
    const { data: announcements, isLoading, error } = useAnnouncements();
    const deleteAnnouncementMutation = useDeleteAnnouncement();
    const createAnnouncementMutation = useCreateAnnouncement();
    const updateAnnouncementMutation = useUpdateAnnouncement();

    const navigate = useNavigate();
    const filteredAnnouncements = announcements?.filter((announcement: AnnouncementDTO) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            announcement.title.toLowerCase().includes(searchLower) ||
            announcement.description.toLowerCase().includes(searchLower)
        );
    });

    const handleDelete = async (id: number) => {
        if (window.confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
            try {
                await deleteAnnouncementMutation.mutateAsync(id);
                alert("Duyuru başarıyla silindi");
            } catch (error) {
                console.error("Duyuru silinirken hata oluştu:", error);
                alert("Duyuru silinirken bir hata oluştu");
            }
        }
    };

    const handleCreate = async (values: CreateAnnouncementInput) => {
        try {
            await createAnnouncementMutation.mutateAsync(values);
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
            await updateAnnouncementMutation.mutateAsync({
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-gray-600">Yükleniyor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Veriler yüklenirken bir hata oluştu
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Duyurular</h1>
                <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                    ← Admin Paneline Dön
                </button>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Yeni Duyuru Oluştur
                </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Başlık veya açıklama ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="text-sm text-gray-600">
                Toplam {filteredAnnouncements?.length || 0} duyuru bulundu
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredAnnouncements && filteredAnnouncements.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Açıklama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Oluşturulma Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAnnouncements.map((announcement: AnnouncementDTO) => (
                                    <tr key={announcement.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {announcement.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {announcement.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-md truncate">
                                                {announcement.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    announcement.status
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {announcement.status ? "Aktif" : "Pasif"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(announcement.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => setEditingAnnouncement(announcement)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement.id)}
                                                disabled={deleteAnnouncementMutation.isPending}
                                                className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        {searchTerm
                            ? "Arama kriterine uygun duyuru bulunamadı"
                            : "Henüz duyuru bulunmamaktadır"}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Yeni Duyuru Oluştur"
            >
                <AnnouncementForm
                    mode="create"
                    onSubmit={handleCreate}
                    submitLabel="Oluştur"
                    defaultValues={{ status: true }}
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
                        submitLabel="Güncelle"
                        defaultValues={{
                            title: editingAnnouncement.title,
                            description: editingAnnouncement.description,
                            imageUrl: editingAnnouncement.imageUrl,
                            status: editingAnnouncement.status,
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

