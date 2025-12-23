import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClubs, useJoinedClubs, useCreateClub } from "../../features/club/hooks/useClub";
import { useAuthUser } from "../../features/auth/hooks/useAuth";
import ClubList from "../../features/club/components/ClubList";
import Modal from "../../components/ui/Modal";
import CreateClubForm from "../../features/club/components/CreateClubForm";
import { CreateClubInput } from "../../features/club/types/club";

export default function ClubPage() {
    const navigate = useNavigate();
    const { data: me } = useAuthUser();
    const { data: allClubs, isLoading: loadingAll } = useClubs();
    const { data: joinedClubs, isLoading: loadingJoined } = useJoinedClubs(!!me);
    const { mutateAsync: createClub } = useCreateClub();

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const handleCreateClub = async (data: CreateClubInput) => {
        try {
            await createClub(data);
            setCreateModalOpen(false);
        } catch (error) {
            console.error("Failed to create club", error);
        }
    };

    if (loadingAll || loadingJoined) {
        return <div className="flex justify-center p-8">Yükleniyor...</div>;
    }

    const approvedClubs = allClubs?.filter(c => c.status === 'APPROVED') || [];
    const isAuthenticated = !!me;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">Kulüpler</h1>
                    {isAuthenticated && (
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Yeni Kulüp İsteği Oluştur
                        </button>
                    )}
                </div>
                <p className="text-gray-600">
                    {isAuthenticated 
                        ? "Kulüplere katılın veya kendi kulübünüzü oluşturun"
                        : "Kulüpleri keşfedin. Katılmak için giriş yapın"}
                </p>
            </div>

            {isAuthenticated && joinedClubs && joinedClubs.length > 0 && (
                <ClubList 
                    title="Üye Olduğum Kulüpler" 
                    clubs={joinedClubs} 
                    showLeaveButton 
                />
            )}

            <ClubList 
                title="Tüm Kulüpler" 
                clubs={approvedClubs} 
                showJoinButton={isAuthenticated}
            />

            {isAuthenticated && (
                <Modal
                    open={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    title="Yeni Kulüp İsteği Oluştur"
                >
                    <CreateClubForm 
                        onSubmit={handleCreateClub} 
                        onCancel={() => setCreateModalOpen(false)} 
                    />
                </Modal>
            )}
        </div>
    );
}
