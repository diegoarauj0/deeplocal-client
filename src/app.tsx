import { ThemeProvider } from "./features/styles/theme.provider"
import { router } from "./features/shared/router"
import { RouterProvider } from "react-router"

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  )
}
