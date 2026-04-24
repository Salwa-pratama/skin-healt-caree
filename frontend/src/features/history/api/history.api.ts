import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSaveHistoryMutation = () => {
  return useMutation({
    mutationFn: async (data: { citra: string; name: string; predictions: any }) => {
      const res = await apiClient.post("/history", data);
      return res.data;
    },
  });
};

export const useGetHistoryQuery = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await apiClient.get("/history");
      return res.data;
    },
  });
};
