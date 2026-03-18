import { createContext } from "react";
import type { ITokens } from "../shared/deeplocal.http";

interface IAuth {
  authenticate: (tokens: ITokens) => void;
  currentUserId: string | null;
  deauthenticate: () => void;
  authenticated: boolean;
}

export const AuthContext = createContext<IAuth>({ currentUserId: null, authenticated: false, authenticate: () => {}, deauthenticate: () => {} });
