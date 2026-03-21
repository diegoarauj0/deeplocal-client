import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./features/styles/contexts/theme.provider";
import { GlobalStyle } from "./features/styles/global.styles";
import { AuthProvider } from "./features/auth/contexts/auth.provider";
import { router } from "./features/shared/router";
import { RouterProvider } from "react-router";
import { ToastProvider } from "./features/shared/contexts/toast.provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <GlobalStyle />
          <ToastProvider />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
