import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../auth/contexts/auth.provider";

export type ColorUser = "red" | "blue" | "green" | "yellow" | "pink" | "purple" | "orange";

export interface InterfacePublicLink {
  ID: string;
  title: string;
  url: string;
  icon: string | null;
  enabled: boolean;
  position: number;
  userId: InterfacePublicUser["ID"];
  createdAt: string;
  updatedAt: string;
}

export interface InterfacePublicUser {
  username: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  ID: string;
  color: ColorUser | null;
  bio: string | null;
  avatar: string | null;
  background: string | null;
}

export interface InterfacePrivateUser extends InterfacePublicUser {
  email: string;
}

export interface InterfaceTokens {
  access: string;
}

const baseURL = import.meta.env.VITE_DEEP_LOCAL_URL || "http://localhost:3000";

axios.defaults.withCredentials = true;

let refreshRequest: Promise<string> | null = null;

export const deepLocalInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function refreshAccessToken() {
  if (!refreshRequest) {
    refreshRequest = refreshClient
      .post("api/auth/refresh")
      .then((response) => {
        const newAccessToken = response.data.tokens.access as string;

        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

        return newAccessToken;
      })
      .catch((error) => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        throw error;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

deepLocalInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  request.withCredentials = true;

  return request;
});

deepLocalInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url as string | undefined;
    const isRefreshRequest = requestUrl?.includes("/auth/refresh");

    if (status === 401 && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

        return deepLocalInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
