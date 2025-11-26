import Modal from "../../../components/ui/Modal";
import { AnnouncementDTO } from "../types/announcement";

type Props = {
    announcement: AnnouncementDTO | null;
    onClose: () => void;
};

export default function AnnouncementDetailModal({ announcement, onClose }: Props) {
    if (!announcement) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Modal open={!!announcement} onClose={onClose} title="">
            <div className="space-y-4">
                {announcement.imageUrl && (
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                        <img
                            src={announcement.imageUrl}
                            alt={announcement.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {announcement.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        {formatDate(announcement.createdAt)}
                    </p>
                </div>

                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {announcement.description}
                    </p>
                </div>

                <div className="pt-4 border-t">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </Modal>
    );
}

