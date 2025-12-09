import { useMessages } from "../../features/message/hooks/useMessage.ts";
import { usePublicClubs } from "../../features/club/hooks/useClub";
import UserAnnouncementsPage from "./UserAnnouncementsPage.tsx";

export default function HomePage() {
  const { data: clubs } = usePublicClubs();
  const { data: messages } = useMessages();
  const activeMessage = messages?.find(m => m.status === true);
  const activeClubs = clubs || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {activeMessage && (
        <div className="bg-indigo-600 text-white px-4 py-3 text-center shadow-md relative z-50">
          <p className="font-medium">{activeMessage.content}</p>
        </div>
      )}
        <main className="flex-grow">
            {/* Navbar varsa ve yüksekliği ~64px ise */}
            <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4" style={{ backgroundImage: `url("./davutpasa-ytu.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Kulüplerle Sosyalleşin
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Üniversite hayatınızı renklendirin, yeni insanlarla tanışın ve ilgi alanlarınıza uygun kulüplere katılın.
                    </p>
                </div>
            </section>

        <UserAnnouncementsPage />

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Aktif Kulüpler</h2>
          
          {activeClubs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Henüz aktif bir kulüp bulunmuyor.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeClubs.map((club) => (
                <div key={club.id} className="bg-white rounded-xl transition border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        {club.memberCount} Üye
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3 h-12">
                      {club.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                      <span>Kurucu: {club.ownerUsername}</span>
                      <span>{new Date(club.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </main>
    </div>
  );
}
