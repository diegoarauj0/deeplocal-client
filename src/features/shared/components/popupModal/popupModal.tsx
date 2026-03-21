import { PopupContext } from "../../contexts/popup.context";
import * as S from "./popupModal.style";
import { useContext } from "react";
import { X } from "lucide-react";

export function PopupModal() {
  const { title, description, closePopup, isOpen, content } = useContext(PopupContext);

  if (!isOpen) return;

  const handleBackdropClick = closePopup;

  function handleModalClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <S.Overlay onClick={handleBackdropClick}>
      <S.Modal onClick={handleModalClick}>
        <S.Header>
          <div>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </div>

          <S.CloseButton type="button" onClick={closePopup} aria-label={"close"}>
            <X size={16} />
          </S.CloseButton>
        </S.Header>

          {content}
      </S.Modal>
    </S.Overlay>
  );
}
