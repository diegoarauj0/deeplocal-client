import { useEffect, useState, type PropsWithChildren } from "react";
import type { ITokens } from "../shared/deeplocal.http";
import { AuthContext } from "./auth.context";

const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const CURRENT_USERNAME_KEY = "USERNAME";
const CURRENT_USER_ID_KEY = "USER_ID";

export function AuthProvider({ children }: PropsWithChildren) {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
  const access = localStorage.getItem(ACCESS_TOKEN_KEY);

  const [authenticated, setAuthenticated] = useState<boolean>(refresh !== null && access !== null);

  const authenticate = (tokens: ITokens, username: string, id: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);

    localStorage.setItem(CURRENT_USERNAME_KEY, username);
    localStorage.setItem(CURRENT_USER_ID_KEY, id);
  };

  const deauthenticate = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    localStorage.removeItem(CURRENT_USERNAME_KEY);
    localStorage.removeItem(CURRENT_USER_ID_KEY);
  };

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
      const access = localStorage.getItem(ACCESS_TOKEN_KEY);

      if ((refresh === null || access === null) && authenticated === true) deauthenticate();

      const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
      const currentUsername = localStorage.getItem(CURRENT_USERNAME_KEY);

      if (
        (currentUserId !== null || currentUsername !== null || refresh === null || access === null) &&
        authenticated === false
      ) {
        setAuthenticated(true);
      }

      setAuthenticated(false);
    }, 1000);

    return () => {
      clearInterval(setIntervalId);
    };
  }, []);

  const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
  const currentUsername = localStorage.getItem(CURRENT_USERNAME_KEY);

  if (currentUserId === null || currentUsername === null) {
    deauthenticate();
  }

  return (
    <AuthContext.Provider value={{ authenticated, authenticate, deauthenticate, currentUserId, currentUsername }}>
      {children}
    </AuthContext.Provider>
  );
}
