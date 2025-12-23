import { ClubResponse } from "../types/club";
import { useJoinClub, useLeaveClub, useApproveClub, useRejectClub } from "../hooks/useClub";
import { useAuthUser } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
    clubs: ClubResponse[];
    title: string;
    showJoinButton?: boolean;
    showLeaveButton?: boolean;
    showStatus?: boolean;
    showAdminActions?: boolean;
};

export default function ClubList({ clubs, title, showJoinButton, showLeaveButton, showStatus, showAdminActions }: Props) {
    const navigate = useNavigate();
    const { mutate: joinClub, isPending: isJoining } = useJoinClub();
    const { mutate: leaveClub, isPending: isLeaving } = useLeaveClub();
    const { mutate: approveClub, isPending: isApproving } = useApproveClub();
    const { mutate: rejectClub, isPending: isRejecting } = useRejectClub();
    
    const { data: user } = useAuthUser();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                                Kulüplere Katılın!
                            </h1>
                        </div>

                        {/* CTA Buttons */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Hesabınızı Oluşturun! 🚀
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                                Hesap oluşturun ve kampüsümüzdeki tüm etkinliklere erişim sağlayın. 
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate("/register")}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Ücretsiz Kayıt Ol
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Giriş Yap
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }


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
                    <div 
                        key={club.id} 
                        className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => navigate(`/clubs/${club.id}`)}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold text-gray-900">{club.name}</h4>
                            {showStatus && (
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                    club.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                    club.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' :
                                    'bg-blue-100 text-blue-800 border-blue-200'
                                }`}>
                                    {club.status === 'APPROVED' ? 'Onaylı' : club.status === 'REJECTED' ? 'Reddedildi' : 'Beklemede'}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{club.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4 pb-4 border-b">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {club.ownerUsername}
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {club.memberCount} üye
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                            
                            {showAdminActions && user?.roleId === 1 && club.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => approveClub(club.id)}
                                        disabled={isApproving}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Onayla
                                    </button>
                                    <button
                                        onClick={() => rejectClub(club.id)}
                                        disabled={isRejecting}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
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
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Üyelik İsteği Gönder
                                </button>
                            )}

                            {club.currentUserStatus === 'PENDING' && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Onay Bekleniyor
                                </span>
                            )}
                           
                            {showLeaveButton && user?.username !== club.ownerUsername && (
                                <button
                                    onClick={() => leaveClub(club.id)}
                                    disabled={isLeaving}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Kulüpten Ayrıl
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
