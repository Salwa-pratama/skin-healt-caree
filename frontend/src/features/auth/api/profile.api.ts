import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await apiClient.get("/feature/profile");
            // Backend returns { status: "success", data: { ...profile } }
            // We want to return just the profile object for easier use in components
            return response.data.data;
        },
    });
};