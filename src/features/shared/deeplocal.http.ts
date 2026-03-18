import axios from "axios";

export interface IPublicUser {
  username: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  ID: string;
  color: string | null;
  bio: string;
  avatar: string | null;
  background: string;
}

export interface IPrivateUser extends IPublicUser {
  email: string;
}

export interface ITokens {
  refresh: string;
  access: string;
}

export const deepLocalInstance = axios.create({
  baseURL: import.meta.env.VITE_DEEP_LOCAL_URL || "http://localhost:3000",
});
