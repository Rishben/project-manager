import { fetchData, postData, updateData } from "@/lib/fetch-util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      postData(`/tasks/${data.projectId}/create-task`, data.taskData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", data.project],
      });
    },
  });
};

export const useTaskByIdQuery = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchData(`/tasks/${taskId}`),
  });
};

export const useUpdateTaskTitleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/title`, { title: data.title }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useUpdateTaskStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/status`, { status: data.status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useUpdateTaskDescriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/description`, {
        description: data.description,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useUpdateTaskAssigneesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/assignees`, {
        assignees: data.assignees,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useUpdateTaskPriorityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/priority`, {
        priority: data.priority,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useAddSubTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      postData(`/tasks/${data.taskId}/add-subtask`, { title: data.title }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useUpdateSubTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateData(`/tasks/${data.taskId}/update-subtask/${data.subTaskId}`, {
        completed: data.completed,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      postData(`/tasks/${data.taskId}/add-comment`, { text: data.text, mentions: data.mentions }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.task] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data.task] });
    },
  });
};

export const useGetCommentsByTaskIdQuery = (taskId) => {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => fetchData(`/tasks/${taskId}/comments`),
  });
};

export const useWatchTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postData(`/tasks/${data.taskId}/watch`, {}),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useAchievedTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postData(`/tasks/${data.taskId}/achieved`, {}),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", data._id] });
      queryClient.invalidateQueries({ queryKey: ["task-activity", data._id] });
    },
  });
};

export const useGetMyTasksQuery = () => {
  return useQuery({
    queryKey: ["my-tasks", "user"],
    queryFn: () => fetchData("/tasks/my-tasks"),
  });
};