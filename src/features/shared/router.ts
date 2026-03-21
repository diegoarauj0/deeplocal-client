import { createBrowserRouter } from "react-router";
import { authRoutes } from "../auth/auth.routes";
import { mainRoutes } from "./main.routes";

export const router = createBrowserRouter([authRoutes, mainRoutes]);
