import { AuthRouteComponent } from "./components/authRoute";
import { RegisterPage } from "./pages/register";
import { AuthLayout } from "./layouts/auth";
import { LoginPage } from "./pages/login";

export const authRoutes = {
  path: "auth",
  element: (
    <AuthRouteComponent>
      <AuthLayout />
    </AuthRouteComponent>
  ),
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
  ],
};