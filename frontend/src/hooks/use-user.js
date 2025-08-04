import { fetchData, updateData } from "@/lib/fetch-util";
import { useMutation, useQuery } from "@tanstack/react-query";

const queryKey = ["user"];

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey,
    queryFn: () => fetchData("/users/profile"),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => updateData("/users/change-password", data),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (data) => updateData("/users/profile", data),
  });
};
