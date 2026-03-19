import { deepLocalInstance, type IPrivateUser } from "../shared/deeplocal.http";

interface ICreateBackgroundUploadUrlData {
  contentType: string;
}

interface ICreateAvatarUploadUrlResponse {
  uploadUrl: string;
  uploadId: string;
}

export async function CreateAvatarUploadUrlService(
  data: ICreateBackgroundUploadUrlData,
): Promise<ICreateAvatarUploadUrlResponse> {
  console.log(`[UserService] CreateAvatarUploadUrlService POST: api/users/avatar/upload-url`);

  const response = await deepLocalInstance.post<ICreateAvatarUploadUrlResponse>("api/users/avatar/upload-url", data);
  return response.data;
}

export interface IUpdateAvatarData {
  uploadId: string;
}

interface IUpdateAvatarResponse {
  user: IPrivateUser;
}

export async function UpdateAvatarService(data: IUpdateAvatarData): Promise<IUpdateAvatarResponse> {
  console.log(`[UserService] UpdateAvatarService PATCH: api/users/avatar`);

  const response = await deepLocalInstance.patch<IUpdateAvatarResponse>("api/users/avatar", data);
  return response.data;
}

export interface IGetUserResponse {
  user: IPrivateUser;
}

export async function GetUserService(identifier: string): Promise<IGetUserResponse> {
  console.log(`[UserService] GetUserService GET: api/users/${identifier}`);

  const response = await deepLocalInstance.get<IUpdateAvatarResponse>(`api/users/${identifier}`);
  return response.data;
}

interface IUpdateUserData {
  username?: string;
  nickname?: string;
  color?: string;
  bio?: string;
}

export interface IUpdateUserResponse {
  user: IPrivateUser;
}

export async function UpdateUserService(data: IUpdateUserData): Promise<IUpdateUserResponse> {
  console.log("[UserService] UpdateUserService PATCH: api/users");

  const response = await deepLocalInstance.patch<IUpdateUserResponse>(`api/users`, data);
  return response.data;
}

interface ICreateBackgroundUploadUrlData {
  contentType: string;
}

interface ICreateBackgroundUploadUrlResponse {
  uploadUrl: string;
  uploadId: string;
}

export async function CreateBackgroundUploadUrlService(
  data: ICreateBackgroundUploadUrlData,
): Promise<ICreateBackgroundUploadUrlResponse> {
  console.log(`[UserService] CreateBackgroundUploadUrlService POST: api/users/background/upload-url`);

  const response = await deepLocalInstance.post<ICreateBackgroundUploadUrlResponse>("api/users/background/upload-url", data);
  return response.data;
}

export interface IUpdateBackgroundData {
  uploadId: string;
}

interface IUpdateBackgroundResponse {
  user: IPrivateUser;
}

export async function UpdateBackgroundService(data: IUpdateBackgroundData): Promise<IUpdateBackgroundResponse> {
  console.log(`[UserService] UpdateBackgroundService PATCH: api/users/background`);

  const response = await deepLocalInstance.patch<IUpdateBackgroundResponse>("api/users/background", data);
  return response.data;
}