import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { App } from "./app.tsx"
import "./features/i18n/i18n.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
