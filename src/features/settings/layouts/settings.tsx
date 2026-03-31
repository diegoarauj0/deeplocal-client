import { useAuthContext } from "../../auth/contexts/auth.context";
import { Outlet, useLocation, useNavigate } from "react-router";
import {  Home, SlidersHorizontal, UserKey, UserRound } from "lucide-react";
import * as S from "./settings.style";

const sections = [
  { label: "Geral", title: "Configurações - Geral", path: "general", icon: <SlidersHorizontal /> },
  { label: "Segurança", title: "Configurações - Segurança", path: "security", icon: <UserKey />, authenticated: true },
];

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername, authenticated } = useAuthContext()

  const icon = authenticated?<UserRound size={20} />:<Home size={20} />

  const activeSection =
    sections.find((section) => location.pathname.includes(`/settings/${section.path}`)) || sections[0];

  const handleBack = () => {
    if (authenticated) return navigate(`/p/${currentUsername}`)
    return navigate("/home")
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack} type="button" aria-label="Voltar">
          {icon}
        </S.BackButton>
        <S.HeaderTitle>{activeSection.title}</S.HeaderTitle>
      </S.Header>
      <S.Sidebar>
        <S.SidebarTitle>Configurações</S.SidebarTitle>
        {sections.map((section) => (
          section.authenticated !== true || (section.authenticated && authenticated)
          ?
          <S.SidebarLink to={ `/settings/${section.path}`} key={section.path} end>
            {section.icon} {section.label}
          </S.SidebarLink>
          :
          null          
        ))}
      </S.Sidebar>
      <S.Main>
        <S.Content>
          <S.Body>
            <Outlet />
          </S.Body>
        </S.Content>
      </S.Main>
    </S.Container>
  );
}
