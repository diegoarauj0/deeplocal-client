import { useLinkManagementModeContext } from "../../contexts/linkManagementMode.context";
import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import { Grip, TriangleAlert } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as S from "./link.style";

interface InterfaceLinkProps {
  link: InterfacePublicLink;
}

interface InterfaceLinkIconProps {
  fallback: string;
  icon?: string;
  title: string;
}

function LinkIconComponent({ icon, title, fallback }: InterfaceLinkIconProps) {
  return (
    <S.IconContainer>
      {icon ? <S.IconImage src={icon} alt={`${title} icon`} /> : <S.IconFallback>{fallback}</S.IconFallback>}
    </S.IconContainer>
  );
}

function LinkContentComponent({ link }: { link: InterfacePublicLink }) {
  const getUrlWithoutProtocol = (url: string) => url.replace(/^https?:\/\//, "");

  return (
    <S.TitleContainer>
      <S.Title>{link.title}</S.Title>
      <S.Url>{getUrlWithoutProtocol(link.url)}</S.Url>
    </S.TitleContainer>
  );
}

export function LinkComponent({ link }: InterfaceLinkProps) {
  const fallback = link.title?.[0]?.toUpperCase() ?? "L";
  const disabled = link.ID.startsWith("temp-");

  const { isLinkManagementMode } = useLinkManagementModeContext();
  const { setNodeRef, listeners, attributes, transform } = useSortable({
    id: link.ID,
    disabled,
  });

  const transformStyle = CSS.Transform.toString(transform);

  if (isLinkManagementMode) {
    const props = { ...listeners, ...attributes };

    return (
      <S.DraggableLinkContainer ref={setNodeRef} {...props} $transform={transformStyle} $disabled={disabled}>
        <LinkIconComponent icon={link.icon ?? undefined} title={link.title} fallback={fallback} />
        <LinkContentComponent link={link} />

        {disabled ? <TriangleAlert /> : <Grip />}
      </S.DraggableLinkContainer>
    );
  }

  return (
    <S.Link href={link.url} target="_blank">
      <LinkIconComponent icon={link.icon ?? undefined} title={link.title} fallback={fallback} />
      <LinkContentComponent link={link} />
    </S.Link>
  );
}
