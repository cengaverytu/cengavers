import { useState } from "react";
import { useAllUsers, useDeleteUser } from "../hooks/useUser";
import { useRoles } from "../../role/hooks/useRole";
import { User } from "../types/user";

export default function UserList() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading: usersLoading, error: usersError } = useAllUsers();
    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRoles();
    const deleteUserMutation = useDeleteUser();

    const filteredUsers = users?.filter((user: User) => {
        const searchLower = searchTerm.toLowerCase();
        return user.username.toLowerCase().includes(searchLower) || 
               (user.email && user.email.toLowerCase().includes(searchLower));
    });

    const handleDelete = async (userId: number) => {
        if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            try {
                await deleteUserMutation.mutateAsync(userId);
                alert("Kullanıcı başarıyla silindi");
            } catch (error) {
                console.error("Kullanıcı silinirken hata oluştu:", error);
                alert("Kullanıcı silinirken bir hata oluştu");
            }
        }
    };

    const getRoleName = (roleId: number) => {
        const role = roles?.find(r => r.id === roleId);
        return role?.name || "Unknown";
    };

    const getRoleColor = (roleId: number) => {
        const role = roles?.find(r => r.id === roleId);
        if (!role) return "bg-gray-100 text-gray-800";
        
        const roleName = role.name.toLowerCase();
        if (roleName.includes("admin")) return "bg-red-100 text-red-800";
        return "bg-green-100 text-green-800";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (usersLoading || rolesLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-gray-600">Yükleniyor...</div>
            </div>
        );
    }

    if (usersError || rolesError) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Veriler yüklenirken bir hata oluştu
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Kullanıcı adı veya e-posta ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="text-sm text-gray-600">
                Toplam {filteredUsers?.length || 0} kullanıcı bulundu
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredUsers && filteredUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kullanıcı Adı
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        E-posta
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Oluşturulma Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user: User) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.username}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {user.email || <span className="text-gray-400 italic">E-posta yok</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.roleId)}`}
                                            >
                                                {getRoleName(user.roleId)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                disabled={deleteUserMutation.isPending}
                                                className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        {searchTerm
                            ? "Arama kriterine uygun kullanıcı bulunamadı"
                            : "Henüz kullanıcı bulunmamaktadır"}
                    </div>
                )}
            </div>
        </div>
    );
}

