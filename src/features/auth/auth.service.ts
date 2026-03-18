import { deepLocalInstance, type IPrivateUser, type ITokens } from "../shared/deeplocal.http";

interface ISignInData {
  password: string;
  email: string;
}

interface ISignInResponse {
  user: IPrivateUser;
  tokens: ITokens;
}

export async function SignInService(data: ISignInData): Promise<ISignInResponse> {
  console.log(`[AuthService] SignInService POST: api/auth/signIn`);

  const response = await deepLocalInstance.post<ISignInResponse>("api/auth/signIn", data);
  return response.data;
}

interface ISignUpData {
  username: string;
  password: string;
  email: string;
}

interface ISignUpResponse {
  user: IPrivateUser;
  tokens: ITokens;
}

export async function SignUpService(data: ISignUpData): Promise<ISignUpResponse> {
  console.log(`[AuthService] SignUpService POST: api/auth/signUp`);

  const response = await deepLocalInstance.post<ISignUpResponse>("api/auth/signUp", data);
  return response.data;
}
