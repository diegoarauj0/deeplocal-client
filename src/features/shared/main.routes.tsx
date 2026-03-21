import { ProfilePage } from "../profile/pages/profile";
import { MainLayout } from "./layouts/main";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [{ path: "p/:identifier", element: <ProfilePage /> }],
};
