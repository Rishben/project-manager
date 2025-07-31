import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api-v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token || ""}`;
  }
  return config;
});

// Handle 401 (unauthorized) errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  }
);

const postData = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

const updateData = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

const fetchData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

const deleteData = async (url) => {
  const response = await api.delete(url);
  return response.data;
};

export { postData, fetchData, updateData, deleteData };
