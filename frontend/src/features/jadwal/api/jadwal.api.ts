import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  CreateTreatmentDTO, 
  UpdateTreatmentDTO, 
  CreateHabitDTO, 
  UpdateHabitDTO,
  JadwalTreatment,
  JadwalHabit
} from "../types";

// ================= TREATMENT =================

export const useGetTreatmentsQuery = () => {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: async () => {
      const res = await apiClient.get<{ status: string; message: string; data: JadwalTreatment[] }>("/feature/todo/treatment");
      return res.data.data;
    },
  });
};

export const useCreateTreatmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTreatmentDTO) => {
      const res = await apiClient.post("/feature/todo/treatment", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    },
  });
};

export const useUpdateTreatmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTreatmentDTO }) => {
      const res = await apiClient.put(`/feature/todo/treatment/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    },
  });
};

export const useDeleteTreatmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(`/feature/todo/treatment/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    },
  });
};

// ================= HABIT =================

export const useGetHabitsQuery = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: async () => {
      const res = await apiClient.get<{ status: string; message: string; data: JadwalHabit[] }>("/feature/todo/habit");
      return res.data.data;
    },
  });
};

export const useCreateHabitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateHabitDTO) => {
      const res = await apiClient.post("/feature/todo/habit", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useUpdateHabitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateHabitDTO }) => {
      const res = await apiClient.put(`/feature/todo/habit/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useDeleteHabitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(`/feature/todo/habit/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};
