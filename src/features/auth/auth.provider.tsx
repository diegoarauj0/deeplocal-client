import { useEffect, useState, type PropsWithChildren } from "react";
import type { ITokens } from "../shared/deeplocal.http";
import { AuthContext } from "./auth.context";

export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const CURRENT_USERNAME_KEY = "USERNAME";
const CURRENT_USER_ID_KEY = "USER_ID";

export function AuthProvider({ children }: PropsWithChildren) {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
  const access = localStorage.getItem(ACCESS_TOKEN_KEY);
  const userId = localStorage.getItem(CURRENT_USER_ID_KEY);
  const username = localStorage.getItem(CURRENT_USERNAME_KEY);

  const isAuthenticated = !!refresh && !!access;

  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);
  const [currentUserId, setCurrentUserId] = useState<string | null>(userId);
  const [currentUsername, setCurrentUsername] = useState<string | null>(username);

  const syncFromStorage = () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    const access = localStorage.getItem(ACCESS_TOKEN_KEY);
    const userId = localStorage.getItem(CURRENT_USER_ID_KEY);
    const username = localStorage.getItem(CURRENT_USERNAME_KEY);

    const isAuthenticated = !!refresh && !!access;

    setAuthenticated(isAuthenticated);
    setCurrentUserId(userId);
    setCurrentUsername(username);
  };

  const authenticate = (tokens: ITokens, username: string, id: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(CURRENT_USERNAME_KEY, username);
    localStorage.setItem(CURRENT_USER_ID_KEY, id);

    syncFromStorage();
  };

  const deauthenticate = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USERNAME_KEY);
    localStorage.removeItem(CURRENT_USER_ID_KEY);

    setAuthenticated(false);
    setCurrentUserId(null);
    setCurrentUsername(null);
  };

  useEffect(() => {
    const handleStorage = () => {
      syncFromStorage();
    };

    handleStorage();

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        authenticate,
        deauthenticate,
        currentUserId,
        currentUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
