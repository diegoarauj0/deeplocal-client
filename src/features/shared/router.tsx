import { RegisterPage } from "../auth/pages/register.page"
import { LoginPage } from "../auth/pages/login.page"
import { AuthLayout } from "../auth/layouts/auth.layout"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
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
])
