import { Outlet } from "react-router";
import * as S from "./main.style";

export function MainLayout() {
  return (
    <S.Content>
      <Outlet />
    </S.Content>
  );
}
