import { ThemeProvider } from "./features/styles/theme.provider";
import { router } from "./features/shared/router";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./features/styles/global.styles";
import { AuthProvider } from "./features/auth/auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <GlobalStyle />
          <ToastContainer />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
