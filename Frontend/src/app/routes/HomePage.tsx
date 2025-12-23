import { useNavigate } from "react-router-dom";
import { useMessages } from "../../features/message/hooks/useMessage.ts";
import { usePublicClubs } from "../../features/club/hooks/useClub";
import { useApprovedEvents } from "../../features/event/hooks/useEvent";
import { useAuthUser } from "../../features/auth/hooks/useAuth";
import UserAnnouncementsPage from "./UserAnnouncementsPage.tsx";
import EventCard from "../../features/event/components/EventCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: clubs } = usePublicClubs();
  const { data: events } = useApprovedEvents();
  const { data: messages } = useMessages();
  const { data: me, isLoading: isLoadingAuth } = useAuthUser();
  const activeMessage = messages?.find(m => m.status === true);
  const activeClubs = clubs || [];
  const upcomingEvents = events?.slice(0, 6) || [];
  
  // Determine if user is authenticated (after loading)
  const isAuthenticated = !isLoadingAuth && !!me;

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

        {/* Upcoming Events Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Yaklaşan Etkinlikler</h2>
                <p className="text-gray-600">Kampüsümüzdeki en yeni ve popüler etkinliklere göz atın</p>
              </div>
              {isAuthenticated && (
                <button
                  onClick={() => navigate("/events")}
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Tümünü Gör
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </div>
            
            {!isAuthenticated ? (
              // Login CTA for events
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center border-2 border-blue-100">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Etkinliklere Katılın! 🎉
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Hemen ücretsiz hesap oluşturun ve kampüs hayatının tadını çıkarın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/register")}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Ücretsiz Kayıt Ol
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Giriş Yap
                  </button>
                </div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-lg">Henüz yaklaşan etkinlik bulunmuyor.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={(e) => navigate(`/events/${e.id}`)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Active Clubs Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Aktif Kulüpler</h2>
          <p className="text-gray-600 mb-8">Kampüsümüzdeki aktif kulüpleri keşfedin</p>
          
          {activeClubs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Henüz aktif bir kulüp bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeClubs.map((club) => (
                <div 
                  key={club.id} 
                  onClick={() => navigate(`/clubs/${club.id}`)}
                  className="bg-white rounded-xl transition border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 cursor-pointer"
                >
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
