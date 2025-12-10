import { useClubs } from "../../features/club/hooks/useClub";
import ClubList from "../../features/club/components/ClubList";

export default function AdminClubsPage() {
    const { data: allClubs, isLoading } = useClubs();

    if (isLoading) {
        return <div className="flex justify-center p-8">Yükleniyor...</div>;
    }

    const pendingClubs = allClubs?.filter(c => c.status === 'PENDING') || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Kulüp Yönetimi</h1>
            </div>

            {pendingClubs.length > 0 && (
                <ClubList 
                    title="Onay Bekleyen Kulüpler" 
                    clubs={pendingClubs} 
                    showStatus 
                    showAdminActions
                />
            )}
            
            <ClubList 
                title="Tüm Kulüpler" 
                clubs={allClubs || []} 
                showStatus 
            />
        </div>
    );
}
