import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import { useTranslation } from "react-i18next";
import { LinkComponent } from "../link/link";
import * as S from "./links.style";

interface InterfaceLinksProps {
  links: InterfacePublicLink[];
  isOwner: boolean;
}

export function LinksComponent({ links, isOwner }: InterfaceLinksProps) {
  const { t } = useTranslation("link");

  if (links.length === 0) {
    return (
      <S.LinksContainer>
        <S.LinkContainer>
          <S.LinksEmpty>
            {isOwner ? t("COMPONENTS.LINKS_COMPONENT.PROFILE_OWNER_EMPTY") : t("COMPONENTS.LINKS_COMPONENT.EMPTY")}
          </S.LinksEmpty>
        </S.LinkContainer>
      </S.LinksContainer>
    );
  }

  return (
    <S.LinksContainer>
      <S.LinkContainer>
        {links.map((link) => (
          <LinkComponent key={link.ID} link={link} />
        ))}
      </S.LinkContainer>
    </S.LinksContainer>
  );
}
