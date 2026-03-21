import { useAuthContext } from "../contexts/auth.context";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";

export function AuthRouteComponent({ children }: PropsWithChildren) {
  const { authenticated, currentUsername } = useAuthContext();

  if (authenticated) {
    return <Navigate to={`/p/${currentUsername || ""}`} />;
  }

  return children;
}
