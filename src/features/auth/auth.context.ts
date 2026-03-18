import type { ITokens } from "../shared/deeplocal.http";
import { createContext } from "react";

interface IAuth {
  authenticate: (tokens: ITokens, username: string, id: string) => void;
  currentUsername: string | null;
  currentUserId: string | null;
  deauthenticate: () => void;
  authenticated: boolean;
}

export const AuthContext = createContext<IAuth>({ currentUserId: null, currentUsername: null, authenticated: false, authenticate: () => {}, deauthenticate: () => {} });
