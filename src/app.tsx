import { ThemeProvider } from "./features/styles/theme.provider";
import { router } from "./features/shared/router";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./features/styles/global.styles";
import { AuthProvider } from "./features/auth/auth.provider";

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyle />
        <ToastContainer />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
