import { Outlet } from "react-router"
import * as S from "./auth.style"

export function AuthLayout() {
  return (
    <S.Content>
      <S.CenteredContainer>
        <S.AuthContainer>
          <Outlet />
        </S.AuthContainer>
        <S.BackgroundContainer />
      </S.CenteredContainer>
    </S.Content>
  )
}
