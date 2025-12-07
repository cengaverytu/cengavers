import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createRoleSchema = z.object({
    name: z.string().min(2, "Rol adı en az 2 karakter olmalıdır"),
    isAdmin: z.boolean().optional(),
});

type CreateRoleInput = z.infer<typeof createRoleSchema>;

type Props = {
    onSubmit: (data: { name: string; isAdmin: boolean }) => void | Promise<void>;
    onCancel: () => void;
};

export default function CreateRoleForm({ onSubmit, onCancel }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateRoleInput>({
        resolver: zodResolver(createRoleSchema),
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit({ name: data.name, isAdmin: !!data.isAdmin }))} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Rol Adı</label>
                <input
                    {...register("name")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Örn: Başkan Yardımcısı"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="flex items-center">
                <input
                    id="isAdmin"
                    type="checkbox"
                    {...register("isAdmin")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                    Yönetici Yetkisi Ver (Üye kabul/red, rol atama)
                </label>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? "Oluşturuluyor..." : "Oluştur"}
                </button>
            </div>
        </form>
    );
}
