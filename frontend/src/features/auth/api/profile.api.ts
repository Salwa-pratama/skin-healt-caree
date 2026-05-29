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
        mutationFn: async (payload: { name?: string; phone?: string; skintype?: string }) => {
            const response = await apiClient.put("/feature/profile", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

