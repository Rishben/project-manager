import { fetchData, postData } from "@/lib/fetch-util";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data) => postData("/workspaces", data),
  });
};

export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => fetchData("/workspaces"),
  });
};

export const useGetWorkspaceQuery = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => fetchData(`/workspaces/${workspaceId}/projects`),
  });
};

export const useGetWorkspaceStatsQuery = (workspaceId) => {
  console.log("THIS IS THE WORKSPACEID:😭",workspaceId);
  return useQuery({
    queryKey: ["workspace", workspaceId, "stats"],
    queryFn: async () => fetchData(`/workspaces/${workspaceId}/stats`),
  });
};

export const useGetWorkspaceDetailsQuery = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace", workspaceId, "details"],
    queryFn: async () => fetchData(`/workspaces/${workspaceId}`),
  });
};

export const useInviteMemberMutation = () => {
  return useMutation({
    mutationFn: (data) =>
      postData(`/workspaces/${data.workspaceId}/invite-member`, data),
  });
};

export const useAcceptInviteByTokenMutation = () => {
  return useMutation({
    mutationFn: (token) =>
      postData(`/workspaces/accept-invite-token`, {
        token,
      }),
  });
};

export const useAcceptGenerateInviteMutation = () => {
  return useMutation({
    mutationFn: (workspaceId) =>
      postData(`/workspaces/${workspaceId}/accept-generate-invite`, {}),
  });
};
