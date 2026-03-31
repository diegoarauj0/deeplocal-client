import { deepLocalInstance, type InterfacePrivateUser, type InterfaceTokens } from "../../shared/deeplocal.http";

const AUTH_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" | "delete" | "get" }> = {
  SIGN_IN: { URL: () => "api/auth/signIn", METHOD: "post" },
  SIGN_UP: { URL: () => "api/auth/signUp", METHOD: "post" },
  LOGOUT: { URL: () => "api/auth/logout", METHOD: "delete" },
  LOGOUT_ALL: { URL: () => "api/auth/logoutAll", METHOD: "delete" },
  ME: { URL: () => "api/auth/me", METHOD: "get" },
};

interface InterfaceSignInData {
  password: string;
  email: string;
}

interface InterfaceAuthResponse {
  user: InterfacePrivateUser;
  tokens: InterfaceTokens;
}

interface InterfaceUserResponse {
  user: InterfacePrivateUser;
}

export async function signInService(data: InterfaceSignInData): Promise<InterfaceAuthResponse> {
  const METHOD = AUTH_ROUTES.SIGN_IN.METHOD;
  const URL = AUTH_ROUTES.SIGN_IN.URL();

  console.log(`[AuthService] signInService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

interface InterfaceSignUpData {
  username: string;
  password: string;
  email: string;
}

export async function signUpService(data: InterfaceSignUpData): Promise<InterfaceAuthResponse> {
  const METHOD = AUTH_ROUTES.SIGN_UP.METHOD;
  const URL = AUTH_ROUTES.SIGN_UP.URL();

  console.log(`[AuthService] signUpService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export async function meService(): Promise<InterfaceUserResponse> {
  const METHOD = AUTH_ROUTES.ME.METHOD;
  const URL = AUTH_ROUTES.ME.URL();

  console.log(`[AuthService] meService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

export async function logoutService(): Promise<void> {
  const METHOD = AUTH_ROUTES.LOGOUT.METHOD;
  const URL = AUTH_ROUTES.LOGOUT.URL();

  console.log(`[AuthService] logoutService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

interface InterfaceLogoutAllData {
  deleteCurrentSession?: boolean;
}

export async function logoutAllService(data: InterfaceLogoutAllData): Promise<void> {
  const METHOD = AUTH_ROUTES.LOGOUT_ALL.METHOD;
  const URL = AUTH_ROUTES.LOGOUT_ALL.URL();

  console.log(`[AuthService] logoutAllService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}
