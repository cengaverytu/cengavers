import { Navigate, useNavigate } from "react-router-dom";
import { useMessages } from "../../features/message/hooks/useMessage";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function HomePage() {
  const { data: messages } = useMessages();
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

      </main>

      <Footer />
    </div>
  );
}
