import { LinkManagementModeProvider } from "./features/link/contexts/linkManagementMode.provider";
import { ThemeProvider } from "./features/styles/contexts/theme.provider";
import { ToastProvider } from "./features/shared/contexts/toast.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/contexts/auth.provider";
import { GlobalStyle } from "./features/styles/global.styles";
import { router } from "./features/shared/router";
import { RouterProvider } from "react-router";

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
          <LinkManagementModeProvider>
            <GlobalStyle />
            <ToastProvider />
            <RouterProvider router={router} />
          </LinkManagementModeProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
