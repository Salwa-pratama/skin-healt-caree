import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminSubscriptions = () => {
  return useQuery({
    queryKey: ["admin", "subscriptions"],
    queryFn: async () => {
      const response = await apiClient.get("/feature/subscription/users");
      return response.data.data;
    },
  });
};

export const useUpdateUserSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiClient.put(`/feature/subscription/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    },
  });
};

export const useDeleteUserSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete(`/feature/subscription/users/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    },
  });
};

export const useAdminPackages = () => {
  return useQuery({
    queryKey: ["admin", "packages"],
    queryFn: async () => {
      const response = await apiClient.get("/feature/subscription/plans");
      return response.data.data;
    },
  });
};

export const useCreatePackageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/feature/subscription/plans", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
    },
  });
};

export const useUpdatePackageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiClient.put(`/feature/subscription/plans/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
    },
  });
};

export const useDeletePackageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete(`/feature/subscription/plans/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
    },
  });
};
