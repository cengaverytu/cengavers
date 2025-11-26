import { AnnouncementDTO } from "../types/announcement";

type Props = {
    announcement: AnnouncementDTO;
    onClick: () => void;
};

export default function AnnouncementCard({ announcement, onClick }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
        >
            {announcement.imageUrl && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        className="w-full h-full object-cover "
                    />
                </div>
            )}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 ">
                        {truncateText(announcement.title, 50)}
                    </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {truncateText(announcement.description, 150)}
                </p>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{formatDate(announcement.createdAt)}</span>
                    <span className="text-indigo-600 font-medium ">
                        Detayları Gör →
                    </span>
                </div>
            </div>
        </div>
    );
}

