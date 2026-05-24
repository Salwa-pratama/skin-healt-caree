import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await apiClient.get("/feature/profile");
            return response.data.data;
        },
    });
};

