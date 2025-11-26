import { useNavigate } from "react-router";

export default function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                    onClick={() => navigate(`/messages`)}
                    className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer group flex flex-col items-center justify-center h-48"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Messages</h2>
                    <p className="text-gray-500 text-center">Manage system messages</p>
                </div>

                <div 
                    onClick={() => navigate(`/admin/users`)}
                    className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition cursor-pointer group flex flex-col items-center justify-center h-48"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Kullanıcılar</h2>
                    <p className="text-gray-500 text-center">View and manage users</p>
                </div>
            </div>
        </div>
    );
}
