import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await apiClient.get("/feature/profile");
            return response.data.data;
        },
    });
};

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { name?: string; phone?: string; skintype?: string; file?: File | null }) => {
            const formData = new FormData();
            if (payload.name) formData.append("name", payload.name);
            if (payload.phone) formData.append("phone", payload.phone);
            if (payload.skintype) {
                formData.append("skintype", payload.skintype);
                formData.append("skinType", payload.skintype);
                formData.append("skin_type", payload.skintype);
            }
            if (payload.file) formData.append("file", payload.file);

            const response = await apiClient.put("/feature/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

