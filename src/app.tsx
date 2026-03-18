import { ThemeProvider } from "./features/styles/theme.provider";
import { router } from "./features/shared/router";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./features/styles/global.styles";

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}
