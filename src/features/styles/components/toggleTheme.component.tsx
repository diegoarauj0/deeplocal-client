import { ThemeContext } from "../theme.context";
import { Sun, Moon } from "lucide-react";
import { useContext } from "react";
import * as S from "./toggleTheme.style";

export function ToggleThemeComponent() {
  const { theme, toggle } = useContext(ThemeContext);

  const icon = theme === "dark" ? <Sun /> : <Moon />;

  return <S.Button onClick={toggle}>{icon}</S.Button>;
}
