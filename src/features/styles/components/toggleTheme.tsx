import { useThemeContext } from "../contexts/theme.context";
import { Sun, Moon } from "lucide-react";
import * as S from "./toggleTheme.style";

export function ToggleThemeComponent() {
  const { theme, toggle } = useThemeContext();

  const icon = theme === "dark" ? <Sun /> : <Moon />;

  return <S.Button onClick={toggle}>{icon}</S.Button>;
}
