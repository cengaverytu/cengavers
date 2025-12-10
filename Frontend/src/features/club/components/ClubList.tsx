import { ClubResponse } from "../types/club";
import { useJoinClub, useLeaveClub, useApproveClub, useRejectClub } from "../hooks/useClub";
import { useAuthUser } from "../../auth/hooks/useAuth";

type Props = {
    clubs: ClubResponse[];
    title: string;
    showJoinButton?: boolean;
    showLeaveButton?: boolean;
    showStatus?: boolean;
    showAdminActions?: boolean;
};

export default function ClubList({ clubs, title, showJoinButton, showLeaveButton, showStatus, showAdminActions }: Props) {
    const { mutate: joinClub, isPending: isJoining } = useJoinClub();
    const { mutate: leaveClub, isPending: isLeaving } = useLeaveClub();
    const { mutate: approveClub, isPending: isApproving } = useApproveClub();
    const { mutate: rejectClub, isPending: isRejecting } = useRejectClub();
    
    const { data: user } = useAuthUser();

    console.log(user);

    if (!clubs || clubs.length === 0) {
        return (
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-500">Henüz kulüp yok.</p>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clubs.map((club) => (
                    <div key={club.id} className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{club.name}</h4>
                            {showStatus && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    club.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                    club.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {club.status}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{club.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                            <span>Kurucu: {club.ownerUsername}</span>
                            <span>{new Date(club.createdAt).toLocaleDateString('tr-TR')}</span>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                            
                            {showAdminActions && user?.roleId === 1 && club.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => approveClub(club.id)}
                                        disabled={isApproving}
                                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Onayla
                                    </button>
                                    <button
                                        onClick={() => rejectClub(club.id)}
                                        disabled={isRejecting}
                                        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Reddet
                                    </button>
                                </>
                            )}

                            {showJoinButton 
                                && user?.username !== club.ownerUsername 
                                && club.status === 'APPROVED' 
                                && club.currentUserStatus !== 'APPROVED' 
                                && club.currentUserStatus !== 'PENDING' && (
                                <button
                                    onClick={() => joinClub(club.id)}
                                    disabled={isJoining}
                                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Başvuru Yap
                                </button>
                            )}

                            {club.currentUserStatus === 'PENDING' && (
                                <span className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded">
                                    İstek Gönderildi
                                </span>
                            )}
                           
                            {showLeaveButton && user?.username !== club.ownerUsername && (
                                <button
                                    onClick={() => leaveClub(club.id)}
                                    disabled={isLeaving}
                                    className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                >
                                    Ayrıl
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
