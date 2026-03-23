import { deepLocalInstance, type InterfacePrivateUser, type InterfacePublicUser } from "../../shared/deeplocal.http";

const USER_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" | "get" | "patch" | "delete" }> =
  {
    CREATE_BACKGROUND_UPLOAD_URL: { URL: () => "api/users/background/upload-url", METHOD: "post" },
    CREATE_AVATAR_UPLOAD_URL: { URL: () => "api/users/avatar/upload-url", METHOD: "post" },
    GET_USER: { URL: (identifier: string) => `api/users/${identifier}`, METHOD: "get" },
    UPDATE_BACKGROUND: { URL: () => "api/users/background", METHOD: "patch" },
    UPDATE_AVATAR: { URL: () => "api/users/avatar", METHOD: "patch" },
    UPDATE_USER: { URL: () => "api/users", METHOD: "patch" },
    DELETE_USER: { URL: () => "api/users", METHOD: "delete" },
  };

export interface InterfaceCreateUploadUrlData {
  contentType: string;
}

export interface InterfaceCreateUploadUrlResponse {
  uploadUrl: string;
  uploadId: string;
}

export async function createAvatarUploadUrlService(
  data: InterfaceCreateUploadUrlData,
): Promise<InterfaceCreateUploadUrlResponse> {
  const METHOD = USER_ROUTES.CREATE_AVATAR_UPLOAD_URL.METHOD;
  const URL = USER_ROUTES.CREATE_AVATAR_UPLOAD_URL.URL();

  console.log(`[UserService] createAvatarUploadUrlService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export async function createBackgroundUploadUrlService(
  data: InterfaceCreateUploadUrlData,
): Promise<InterfaceCreateUploadUrlResponse> {
  const METHOD = USER_ROUTES.CREATE_BACKGROUND_UPLOAD_URL.METHOD;
  const URL = USER_ROUTES.CREATE_BACKGROUND_UPLOAD_URL.URL();

  console.log(`[UserService] createBackgroundUploadUrlService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export interface InterfaceUpdateFileData {
  uploadId: string;
}

interface InterfaceUpdateFileResponse {
  user: InterfacePrivateUser;
}

export async function updateAvatarService(data: InterfaceUpdateFileData): Promise<InterfaceUpdateFileResponse> {
  const METHOD = USER_ROUTES.UPDATE_AVATAR.METHOD;
  const URL = USER_ROUTES.UPDATE_AVATAR.URL();

  console.log(`[UserService] updateAvatarService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance.patch(URL, data);
  return response.data;
}

export async function updateBackgroundService(data: InterfaceUpdateFileData): Promise<InterfaceUpdateFileResponse> {
  const METHOD = USER_ROUTES.UPDATE_BACKGROUND.METHOD;
  const URL = USER_ROUTES.UPDATE_BACKGROUND.URL();

  console.log(`[UserService] updateBackgroundService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export interface InterfaceUserResponse {
  user: InterfacePrivateUser;
}

export async function getUserService(identifier: string): Promise<InterfaceUserResponse> {
  const METHOD = USER_ROUTES.GET_USER.METHOD;
  const URL = USER_ROUTES.GET_USER.URL(identifier);

  console.log(`[UserService] getUserService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

interface InterfaceUpdateUserData {
  username?: InterfacePublicUser["username"] | undefined;
  nickname?: InterfacePublicUser["nickname"] | undefined;
  color?: InterfacePublicUser["color"] | undefined;
  bio?: InterfacePublicUser["bio"] | undefined;
}

export async function updateUserService(data: InterfaceUpdateUserData): Promise<InterfaceUserResponse> {
  const METHOD = USER_ROUTES.UPDATE_USER.METHOD;
  const URL = USER_ROUTES.UPDATE_USER.URL();

  console.log(`[UserService] updateUserService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export async function deleteUserService(): Promise<void> {
  const METHOD = USER_ROUTES.DELETE_USER.METHOD;
  const URL = USER_ROUTES.DELETE_USER.URL();

  console.log(`[UserService] deleteUserService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}
