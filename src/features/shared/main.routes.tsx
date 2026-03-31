import { SecuritySettingsPage } from "../settings/pages/security/security";
import { PrivateRouteComponent } from "../auth/components/privateRoute";
import { GeneralSettingsPage } from "../settings/pages/general/general";
import { SettingsLayout } from "../settings/layouts/settings";
import { ProfilePage } from "../profile/pages/profile";
import { HomePage } from "../home/pages/home";
import { MainLayout } from "./layouts/main";
import { Navigate } from "react-router";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "p/:identifier", element: <ProfilePage /> },
    {
      path: "settings",
      element: <SettingsLayout />,
      children: [
        { index: true, element: <Navigate to="general" replace /> },
        { path: "general", element: <GeneralSettingsPage /> },
        { path: "security", element: <PrivateRouteComponent><SecuritySettingsPage /></PrivateRouteComponent> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
};
