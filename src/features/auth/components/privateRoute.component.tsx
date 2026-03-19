import { useContext, type PropsWithChildren } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router";

export function PrivateRouteComponent({ children }: PropsWithChildren) {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
