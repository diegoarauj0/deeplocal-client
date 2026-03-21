import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import * as S from "./link.style";

interface InterfaceLinkProps {
  link: InterfacePublicLink;
}

export function LinkComponent({ link }: InterfaceLinkProps) {
  const fallback = link.title?.[0]?.toUpperCase() ?? "L";

  return (
    <S.Link href={link.url} target="_blank">
      <S.IconContainer>
        {link.icon ? (
          <S.IconImage src={link.icon} alt={`${link.title} icon`} />
        ) : (
          <S.IconFallback>{fallback}</S.IconFallback>
        )}
      </S.IconContainer>
      <S.TitleContainer>
        <S.Title>{link.title}</S.Title>
        <S.Url>{link.url.replace("https://", "").replace("http://", "")}</S.Url>
      </S.TitleContainer>
    </S.Link>
  );
}
