import { useLinkManagementModeContext } from "../../contexts/linkManagementMode.context";
import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import { useDeleteLink } from "../../hooks/reactQuery/useDeleteLink";
import { Eye, EyeClosed, Grip, Pencil, Trash, TriangleAlert, Upload } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as S from "./link.style";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { type MouseEvent, useContext } from "react";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { EditLinkModalComponent } from "../editLink/editLinkModal";
import { useToggleLink } from "../../hooks/reactQuery/useToggleLink";
import { UploadLinkIconModalComponent } from "./uploadLinkIconModal";

interface InterfaceLinkProps {
  link: InterfacePublicLink;
}

interface InterfaceLinkIconProps {
  fallback: string;
  icon?: string;
  title: string;
  uploadLabel?: string;
  onUploadClick?: () => void;
}

function LinkIconComponent({ icon, title, fallback, uploadLabel, onUploadClick }: InterfaceLinkIconProps) {
  const handleUploadClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onUploadClick?.();
  };

  return (
    <S.IconWrapper $interactive={Boolean(onUploadClick)}>
      <S.IconContainer>
        {icon ? <S.IconImage src={icon} alt={`${title} icon`} /> : <S.IconFallback>{fallback}</S.IconFallback>}
      </S.IconContainer>
      {onUploadClick && (
        <S.IconUploadButton type="button" aria-label={uploadLabel} onClick={handleUploadClick}>
          <Upload />
        </S.IconUploadButton>
      )}
    </S.IconWrapper>
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
  const { mutateAsync: deleteAsync } = useDeleteLink(link.userId);
  const { mutateAsync: toggleAsync } = useToggleLink(link.userId);
  const disabled = link.ID.startsWith("temp-");
  const { t } = useTranslation("link");
  const { openPopup } = useContext(PopupContext);

  const { isLinkManagementMode } = useLinkManagementModeContext();
  const { setNodeRef, listeners, attributes, transform } = useSortable({
    id: link.ID,
    disabled,
  });

  const transformStyle = CSS.Transform.toString(transform);

  if (isLinkManagementMode) {
    const props = { ...listeners, ...attributes };

    const DELETE_LINK_NOTIFICATION_ID = "DELETE_LINK_NOTIFICATION";
    const AUTO_CLOSE = 6000;

    const handleDeleteLink = async () => {
      toast.loading(t("COMPONENTS.LINK.NOTIFICATION.DELETE_LINK.LOADING"), {
        toastId: DELETE_LINK_NOTIFICATION_ID,
        isLoading: true,
      });

      try {
        await deleteAsync(link.ID);

        toast.update(DELETE_LINK_NOTIFICATION_ID, {
          render: t("COMPONENTS.LINK.NOTIFICATION.DELETE_LINK.SUCCESS"),
          autoClose: AUTO_CLOSE,
          isLoading: false,
          type: "success",
        });
      } catch {
        toast.update(DELETE_LINK_NOTIFICATION_ID, {
          render: t("COMPONENTS.LINK.NOTIFICATION.DELETE_LINK.ERROR"),
          autoClose: AUTO_CLOSE,
          isLoading: false,
          type: "error",
        });
      }
    };

    const handleVisibilityLink = async () => {
      toast.loading(t("COMPONENTS.LINK.NOTIFICATION.TOGGLE_VISIBILITY_LINK.LOADING"), {
        toastId: DELETE_LINK_NOTIFICATION_ID,
        isLoading: true,
      });

      try {
        await toggleAsync(link.ID);

        toast.update(DELETE_LINK_NOTIFICATION_ID, {
          render: t("COMPONENTS.LINK.NOTIFICATION.TOGGLE_VISIBILITY_LINK.SUCCESS"),
          autoClose: AUTO_CLOSE,
          isLoading: false,
          type: "success",
        });
      } catch {
        toast.update(DELETE_LINK_NOTIFICATION_ID, {
          render: t("COMPONENTS.LINK.NOTIFICATION.TOGGLE_VISIBILITY_LINK.ERROR"),
          autoClose: AUTO_CLOSE,
          isLoading: false,
          type: "error",
        });
      }
    };

    const openIconUploadModal = () => {
      if (disabled) return;

      openPopup(
        <UploadLinkIconModalComponent link={link} />,
        t("COMPONENTS.LINK_ICON_UPLOAD.TITLE"),
        t("COMPONENTS.LINK_ICON_UPLOAD.DESCRIPTION"),
      );
    };

    const openEditModal = () => {
      if (disabled) return;

      openPopup(
        <EditLinkModalComponent link={link} />,
        t("COMPONENTS.EDIT_LINK.TITLE"),
        t("COMPONENTS.EDIT_LINK.DESCRIPTION"),
      );
    };

    return (
      <S.DraggableLinkContainer
        ref={setNodeRef}
        $transform={transformStyle}
        $disabled={disabled}
        $enabled={link.enabled}
      >
        <LinkIconComponent
          icon={link.icon ?? undefined}
          title={link.title}
          fallback={fallback}
          uploadLabel={t("COMPONENTS.LINK_ICON_UPLOAD.UPLOAD_LABEL")}
          onUploadClick={disabled ? undefined : openIconUploadModal}
        />
        <LinkContentComponent link={link} />
        <S.LinkHandlerButton disabled={disabled} $disabled={disabled} type="button" onClick={handleVisibilityLink}>
          {link.enabled ? <Eye /> : <EyeClosed />}
        </S.LinkHandlerButton>
        <S.LinkHandlerButton disabled={disabled} $disabled={disabled} type="button" onClick={openEditModal}>
          <Pencil />
        </S.LinkHandlerButton>
        <S.LinkHandlerButton disabled={disabled} $disabled={disabled} type="button" onClick={handleDeleteLink}>
          <Trash />
        </S.LinkHandlerButton>
        <S.GripIconContainer>{disabled ? <TriangleAlert /> : <Grip {...props} />}</S.GripIconContainer>
      </S.DraggableLinkContainer>
    );
  }

  if (!link.enabled) return null;

  return (
    <S.Link href={link.url} target="_blank">
      <LinkIconComponent icon={link.icon ?? undefined} title={link.title} fallback={fallback} />
      <LinkContentComponent link={link} />
    </S.Link>
  );
}
