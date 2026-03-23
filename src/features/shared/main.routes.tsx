import { PrivateRouteComponent } from "../auth/components/privateRoute";
import { ProfilePage } from "../profile/pages/profile";
import { SettingsLayout } from "../settings/layouts/settings";
import { GeneralSettingsPage } from "../settings/pages/general/general.page";
import { SecuritySettingsPage } from "../settings/pages/security/security.page";
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
      element: (
        <PrivateRouteComponent>
          <SettingsLayout />
        </PrivateRouteComponent>
      ),
      children: [
        { index: true, element: <Navigate to="general" replace /> },
        { path: "general", element: <GeneralSettingsPage /> },
        { path: "security", element: <SecuritySettingsPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
};
