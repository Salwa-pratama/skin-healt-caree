import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface SaveHistoryPayload {
  file: File;
  jerawat: string;
  predictions: any;
}

export const useSaveHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SaveHistoryPayload) => {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append("jerawat", payload.jerawat);
      formData.append("predictions", JSON.stringify(payload.predictions));

      const res = await apiClient.post("/feature/history", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

export const useGetHistoryQuery = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await apiClient.get("/feature/history");
      return res.data;
    },
  });
};

export const useDeleteHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.delete(`/feature/history/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};
