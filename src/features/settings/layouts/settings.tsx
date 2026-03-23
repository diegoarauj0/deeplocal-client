import { useAuthContext } from "../../auth/contexts/auth.context";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ArrowBigLeft, SlidersHorizontal, UserKey } from "lucide-react";
import * as S from "./settings.style";

const sections = [
  { label: "Geral", title: "Configurações - Geral", path: "general", icon: <SlidersHorizontal /> },
  { label: "Segurança", title: "Configurações - Segurança", path: "security", icon: <UserKey /> },
];

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername } = useAuthContext()

  const activeSection =
    sections.find((section) => location.pathname.includes(`/settings/${section.path}`)) || sections[0];

  const handleBack = () => {
    navigate(`/p/${currentUsername}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack} type="button" aria-label="Voltar">
          <ArrowBigLeft size={20} />
        </S.BackButton>
        <S.HeaderTitle>{activeSection.title}</S.HeaderTitle>
      </S.Header>
      <S.Sidebar>
        <S.SidebarTitle>Configurações</S.SidebarTitle>
        {sections.map((section) => (
          <S.SidebarLink to={`/settings/${section.path}`} key={section.path} end>
            {section.icon} {section.label}
          </S.SidebarLink>
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
