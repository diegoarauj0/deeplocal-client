import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../auth/auth.provider";
import axios from "axios";
import type { ThemeVariant } from "../styles/themes";

export interface IPublicUser {
  username: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  ID: string;
  color: ThemeVariant | null;
  bio: string | null;
  avatar: string | null;
  background: string | null;
}

export interface IPrivateUser extends IPublicUser {
  email: string;
}

export interface ITokens {
  refresh: string;
  access: string;
}

const baseURL = import.meta.env.VITE_DEEP_LOCAL_URL || "http://localhost:3000";

export const deepLocalInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

deepLocalInstance.interceptors.request.use((request) => {
  const access = localStorage.getItem(ACCESS_TOKEN_KEY);

  request.headers.set("Authorization", `Bearer ${access}`);

  return request;
});

deepLocalInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.error.code === "INVALID_TOKEN_EXCEPTION" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);

        const response = await axios.post(`${baseURL}/api/auth/refresh`, undefined, {
          headers: {
            Authorization: `Bearer ${refresh}`,
          },
        });

        const { access, refresh: newRefresh } = response.data.tokens;

        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);

        deepLocalInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

        return deepLocalInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
