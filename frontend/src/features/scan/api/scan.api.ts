import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const usePredictMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post("/feature/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
  });
};
