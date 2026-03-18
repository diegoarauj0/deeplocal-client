import { useContext, type PropsWithChildren } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router";

export function AuthRouteComponent({ children }: PropsWithChildren) {
  const { authenticated, currentUsername } = useContext(AuthContext);

  if (authenticated) {
    return <Navigate to={`/p/${currentUsername || ""}`} />;
  }

  return children;
}
