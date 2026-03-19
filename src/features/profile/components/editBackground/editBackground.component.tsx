import { Upload, X } from "lucide-react";
import * as S from "./editBackground.style";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateBackground } from "../../hooks/useUpdateBackground.hook";

interface IEditBackgroundProps {
  identifier: string;
}

interface IEditBackgroundModalProps extends IEditBackgroundProps {
  onClose: () => void;
}

export function EditBackgroundModal({ onClose, identifier }: IEditBackgroundModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useUpdateBackground(identifier);
  const [isValid, setIsValid] = useState(false);
  const { t } = useTranslation("profile");

  const handleBackdropClick = () => onClose();

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      return;
    }

    setFile(selectedFile);
    setIsValid(true);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!file) return;

    mutate(file);
    setIsSubmitting(false);
    onClose();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <S.Overlay onClick={handleBackdropClick}>
      <S.Modal onClick={handleModalClick}>
        <S.Header>
          <S.Title>{t("editBackground.title")}</S.Title>

          <S.CloseButton type="button" onClick={onClose} aria-label={t("common.closeModal")}>
            <X size={16} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          {previewUrl && (
            <S.PreviewContainer>
              <img src={previewUrl} alt={t("editBackground.previewAlt")} />
            </S.PreviewContainer>
          )}

          <input type="file" accept="image/*" onChange={handleFileChange} />

          <S.Submit
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            $isValid={isValid}
            $isSubmitting={isSubmitting}
          >
            {isSubmitting ? t("common.sending") : t("common.send")}
          </S.Submit>
        </S.Content>
      </S.Modal>
    </S.Overlay>
  );
}

export function EditBackgroundComponent({ identifier }: IEditBackgroundProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { t } = useTranslation("profile");

  return (
    <>
      {isOpen && <EditBackgroundModal onClose={closeModal} identifier={identifier} />}

      <S.FloatingButton onClick={openModal} aria-label={t("common.openSettings")}>
        <Upload />
      </S.FloatingButton>
    </>
  );
}
