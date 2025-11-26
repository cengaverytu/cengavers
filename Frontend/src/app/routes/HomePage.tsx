import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMessages } from "../../features/message/hooks/useMessage";
import { useActiveAnnouncements } from "../../features/announcement/hooks/useAnnouncement";
import { AnnouncementDTO } from "../../features/announcement/types/announcement";
import AnnouncementCard from "../../features/announcement/components/AnnouncementCard";
import AnnouncementDetailModal from "../../features/announcement/components/AnnouncementDetailModal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

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

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Kulüplerle Sosyalleşin
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Üniversite hayatınızı renklendirin, yeni insanlarla tanışın ve ilgi alanlarınıza uygun kulüplere katılın.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
            >
              Hemen Üye Ol
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-full font-semibold text-lg hover:bg-indigo-50 transition shadow-sm"
            >
              Giriş Yap
            </button>
          </div>
        </div>

        {/* Duyurular Bölümü */}
        {announcements && announcements.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Son Duyurular
              </h2>
              <p className="text-gray-600">
                Kulüplerimizden ve etkinliklerimizden haberdar olun
              </p>
            </div>
            
            {announcementsLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-gray-600">Yükleniyor...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />

      {/* Duyuru Detay Modal */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
