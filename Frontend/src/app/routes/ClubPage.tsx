import { useState } from "react";
import { useCreateClub } from "../../features/club/hooks/useClub";
import Modal from "../../components/ui/Modal";
import CreateClubForm from "../../features/club/components/CreateClubForm";
import { CreateClubInput } from "../../features/club/types/club";

export default function ClubPage() {
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


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Kulüpler</h1>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Yeni Kulüp Oluştur
                </button>
            </div>

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
        </div>
    );
}
