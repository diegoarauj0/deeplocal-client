import { AuthRouteComponent } from "../auth/components/authRoute.component";
import { RegisterPage } from "../auth/pages/register.page";
import { AuthLayout } from "../auth/layouts/auth.layout";
import { LoginPage } from "../auth/pages/login.page";
import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/main.layout";
import { ProfilePage } from "../profile/pages/profile.page";

export const router = createBrowserRouter([
  {
    path: "auth",
    element: (
      <AuthRouteComponent>
        <AuthLayout />
      </AuthRouteComponent>
    ),
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "p/:identificar",
        element: <ProfilePage />,
      },
    ],
  },
]);
