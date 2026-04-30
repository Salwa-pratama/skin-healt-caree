import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import Cookies from "js-cookie";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      // Adjusted based on backend setup (assumes it returns { token: '...'} or sets it)
      const res = await apiClient.post("/auth/login", credentials);
      return res.data;
    },
    onSuccess: (resData: any) => {
      // Adjusted exactly to fit backend structure:
      if (resData?.data?.accessToken) {
        Cookies.set("access_token", resData.data.accessToken, { expires: 1, path: "/" });
      }
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const res = await apiClient.post("/auth/register", userData);
      return res.data;
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/auth/logout");
      return res.data;
    },
    onSettled: () => {
      Cookies.remove("access_token", { path: "/" });
      window.location.href = "/pages/auth/login";
    }
  });
};
