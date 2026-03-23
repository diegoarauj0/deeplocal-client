import { useLinkManagementModeContext } from "../../contexts/linkManagementMode.context";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import { useReorderLink } from "../../hooks/reactQuery/useReorderLink";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useTranslation } from "react-i18next";
import { LinkComponent } from "../link/link";
import { toast } from "react-toastify";
import * as S from "./links.style";
import { useState } from "react";

interface InterfaceLinksProps {
  links: InterfacePublicLink[];
  isOwner: boolean;
  userId: string;
}

export function LinksComponent({ links, isOwner, userId }: InterfaceLinksProps) {
  const { isLinkManagementMode } = useLinkManagementModeContext();
  const { mutate } = useReorderLink(userId);
  const { t } = useTranslation("link");

  const [grab, setGrab] = useState(false);

  if (links.filter((link) => link.enabled).length === 0 && !isLinkManagementMode) {
    return (
      <S.LinksContainer $isLinkManagementMode={isLinkManagementMode}>
        <S.LinksEmpty>
          {isOwner ? t("COMPONENTS.LINKS_COMPONENT.PROFILE_OWNER_EMPTY") : t("COMPONENTS.LINKS_COMPONENT.EMPTY")}
        </S.LinksEmpty>
      </S.LinksContainer>
    );
  }

  const items = links.map((link) => ({ id: link.ID }));

  const linksMap = new Map(links.map((l) => [l.ID, l]));

  const toastId = "NOTIFICATION_REORDER_LINK";

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    try {
      setGrab(false);

      if (!over || active.id === over.id) return;

      const target = linksMap.get(active.id as string);
      const overLink = linksMap.get(over.id as string);

      if (!target || !overLink) return;
      if (target.ID.startsWith("temp-") || overLink.ID.startsWith("temp-")) {
        return toast(t("COMPONENTS.LINKS.NOTIFICATION.INVALID_REORDER_LINK"), {
          toastId,
          type: "warning",
          autoClose: 3000,
        });
      }

      if (overLink.position < target.position) {
        mutate({ id: target.ID, beforeId: overLink.ID });
      }

      if (overLink.position > target.position) {
        mutate({ id: target.ID, afterId: overLink.ID });
      }
    } catch {
      toast(t("COMPONENTS.LINKS.NOTIFICATION.UNEXPECTED"), {
        toastId,
        type: "error",
        autoClose: 5000,
      });
    }
  };

  const renderLinks = () => links.map((link) => <LinkComponent key={link.ID} link={link} />);

  return (
    <S.LinksContainer $grab={grab} $isLinkManagementMode={isLinkManagementMode}>
      {isLinkManagementMode ? (
        <DndContext onDragStart={() => setGrab(true)} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {renderLinks()}
          </SortableContext>
        </DndContext>
      ) : (
        renderLinks()
      )}
    </S.LinksContainer>
  );
}
