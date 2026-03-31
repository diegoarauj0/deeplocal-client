import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import type { InterfaceTokens } from "../../shared/deeplocal.http";
import { AuthContext } from "./auth.context";
import { meService } from "../services/auth.service";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
export const CURRENT_USERNAME_KEY = "USERNAME";
const CURRENT_USER_ID_KEY = "USER_ID";

export function AuthProvider({ children }: PropsWithChildren) {
  const access = localStorage.getItem(ACCESS_TOKEN_KEY);

  const isAuthenticated = access !== null;

  if (!isAuthenticated) {
    localStorage.removeItem(CURRENT_USER_ID_KEY);
    localStorage.removeItem(CURRENT_USERNAME_KEY);
  }

  const userId = localStorage.getItem(CURRENT_USER_ID_KEY);
  const username = localStorage.getItem(CURRENT_USERNAME_KEY);

  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);
  const [currentUserId, setCurrentUserId] = useState<string | null>(userId);
  const [currentUsername, setCurrentUsername] = useState<string | null>(username);

  const syncFromStorage = useCallback(() => {
    const access = localStorage.getItem(ACCESS_TOKEN_KEY);

    const isAuthenticated = access !== null;

    if (!isAuthenticated) {
      localStorage.removeItem(CURRENT_USER_ID_KEY);
      localStorage.removeItem(CURRENT_USERNAME_KEY);
    }

    const userId = localStorage.getItem(CURRENT_USER_ID_KEY);
    const username = localStorage.getItem(CURRENT_USERNAME_KEY);

    if (isAuthenticated === authenticated) return;

    setAuthenticated(isAuthenticated);
    setCurrentUserId(userId);
    setCurrentUsername(username);
  }, [authenticated]);

  const authenticate = (tokens: InterfaceTokens, username: string, id: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(CURRENT_USERNAME_KEY, username);
    localStorage.setItem(CURRENT_USER_ID_KEY, id);

    syncFromStorage();
  };

  const deauthenticate = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USERNAME_KEY);
    localStorage.removeItem(CURRENT_USER_ID_KEY);

    setAuthenticated(false);
    setCurrentUserId(null);
    setCurrentUsername(null);
  };

  useEffect(() => {
    if (authenticated) {
      const handleStorage = async () => {
        try {
          const { user } = await meService();

          const access = localStorage.getItem(ACCESS_TOKEN_KEY) as string;

          authenticate({ access }, user.username, user.ID);
        } catch {}
      };

      const IntervalId = setInterval(() => {
        handleStorage();
      }, 120000);

      handleStorage();

      return () => clearInterval(IntervalId);
    }
  }, [syncFromStorage]);

  useEffect(() => {
    const handleStorage = () => {
      syncFromStorage();
    };

    handleStorage();

    const IntervalId = setInterval(() => {
      handleStorage();
    }, 2000);

    return () => clearInterval(IntervalId);
  }, [syncFromStorage]);

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
