import type { InterfaceTokens } from "../../shared/deeplocal.http";
import { createContext, useContext } from "react";

interface InterfaceAuth {
  authenticate: (tokens: InterfaceTokens, username: string, id: string) => void;
  currentUsername: string | null;
  currentUserId: string | null;
  deauthenticate: () => void;
  authenticated: boolean;
}

export const AuthContext = createContext<InterfaceAuth>({
  currentUserId: null,
  currentUsername: null,
  authenticated: false,
  authenticate: () => {},
  deauthenticate: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
