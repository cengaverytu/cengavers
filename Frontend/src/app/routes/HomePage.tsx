import { useMessages } from "../../features/message/hooks/useMessage.ts";
import UserAnnouncementsPage from "./UserAnnouncementsPage.tsx";

export default function HomePage() {
  const { data: messages } = useMessages();
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
        </main>

        <UserAnnouncementsPage />
    </div>
  );
}
