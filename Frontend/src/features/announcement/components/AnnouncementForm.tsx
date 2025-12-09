import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAnnouncementInput, createAnnouncementSchema, UpdateAnnouncementInput, updateAnnouncementSchema } from "../types/announcement";

type CreateProps = {
    mode: "create";
    defaultValues?: Partial<CreateAnnouncementInput>;
    onSubmit: (values: CreateAnnouncementInput) => void | Promise<void>;
    submitLabel?: string;
};

type UpdateProps = {
    mode: "update";
    defaultValues?: Partial<UpdateAnnouncementInput>;
    onSubmit: (values: UpdateAnnouncementInput) => void | Promise<void>;
    submitLabel?: string;
};

type Props = CreateProps | UpdateProps;

export default function AnnouncementForm(props: Props) {
    const { defaultValues, submitLabel = "Kaydet", mode } = props;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateAnnouncementInput | UpdateAnnouncementInput>({
        resolver: zodResolver(mode === "create" ? createAnnouncementSchema : updateAnnouncementSchema),
        defaultValues,
    });

    const handleFormSubmit = (data: CreateAnnouncementInput | UpdateAnnouncementInput) => {
        props.onSubmit(data as any);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    
                    Başlık {mode === "create" && <span className="text-red-500">*</span>}
                </label>
                <input
                    {...register("title")}
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Duyuru başlığı"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Açıklama {mode === "create" && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    {...register("description")}
                    rows={6}
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Duyuru açıklaması"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Resim URL</label>
                <input
                    {...register("imageUrl")}
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                )}
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    {...register("status")}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">Aktif</label>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Kaydediliyor..." : submitLabel}
                </button>
            </div>
        </form>
    );
}

