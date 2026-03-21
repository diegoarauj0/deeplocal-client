import { useThemeContext } from "../../styles/contexts/theme.context";
import { ToastContainer } from "react-toastify";

export function ToastProvider() {
  const { theme, themeProps } = useThemeContext();

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme={theme === "dark" ? "dark" : "light"}
      toastStyle={{
        backgroundColor: themeProps.bg.normal,
        color: themeProps.text.normal,
        border: `1px solid ${themeProps.border.normal}`,
      }}
    />
  );
}