import { useAuthContext } from "../contexts/auth.context";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";

export function PrivateRouteComponent({ children }: PropsWithChildren) {
  const { authenticated } = useAuthContext();

  if (!authenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
