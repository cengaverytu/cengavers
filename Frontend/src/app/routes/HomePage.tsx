import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMessages } from "../../features/message/hooks/useMessage";
import { useActiveAnnouncements } from "../../features/announcement/hooks/useAnnouncement";
import { AnnouncementDTO } from "../../features/announcement/types/announcement";
import AnnouncementCard from "../../features/announcement/components/AnnouncementCard";
import AnnouncementDetailModal from "../../features/announcement/components/AnnouncementDetailModal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import UserAnnouncementsPage from "./UserAnnouncementsPage.tsx";

export default function HomePage() {
  const { data: messages } = useMessages();
  const { data: announcements, isLoading: announcementsLoading } = useActiveAnnouncements();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementDTO | null>(null);
  const navigate = useNavigate();

  const activeMessage = messages?.find(m => m.status === true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {activeMessage && (
        <div className="bg-indigo-600 text-white px-4 py-3 text-center shadow-md relative z-50">
          <p className="font-medium">{activeMessage.content}</p>
        </div>
      )}
        <main className="flex-grow">
            {/* Navbar varsa ve yüksekliği ~64px ise */}
            <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
                <div className="text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Kulüplerle Sosyalleşin
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Üniversite hayatınızı renklendirin, yeni insanlarla tanışın ve ilgi alanlarınıza uygun kulüplere katılın.
                    </p>
                </div>
            </section>
        </main>




        {/* Duyuru Detay Modal */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
