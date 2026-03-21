import { PopupProvider } from "../contexts/popup.provider";
import { Outlet } from "react-router";
import * as S from "./main.style";

export function MainLayout() {
  return (
    <PopupProvider>
      <S.Content>
        <Outlet />
      </S.Content>
    </PopupProvider>
  );
}
