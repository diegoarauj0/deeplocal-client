import { deepLocalInstance, type InterfacePrivateUser, type InterfaceTokens } from "../../shared/deeplocal.http";

const AUTH_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" }> = {
  SIGN_IN: { URL: () => "api/auth/signIn", METHOD: "post" },
  SIGN_UP: { URL: () => "api/auth/signUp", METHOD: "post" },
};

interface InterfaceSignInData {
  password: string;
  email: string;
}

interface InterfaceAuthResponse {
  user: InterfacePrivateUser;
  tokens: InterfaceTokens;
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
