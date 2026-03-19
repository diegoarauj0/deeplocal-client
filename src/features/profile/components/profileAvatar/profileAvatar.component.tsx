import { useUpdateAvatar } from "../../hooks/useUpdateAvatar.hook";
import { useEffect, useState } from "react";
import * as S from "./profileAvatar.style";
import { Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UploadAvatarModalProps {
  onClose: () => void;
}

interface UploadAvatarModalProps {
  onClose: () => void;
  identifier: string;
}

export function UploadAvatarModal({ onClose, identifier }: UploadAvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useUpdateAvatar(identifier);
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
          <S.Title>{t("profileAvatar.title")}</S.Title>

          <S.CloseButton type="button" onClick={onClose} aria-label={t("common.closeModal")}>
            <X size={16} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          {previewUrl && (
            <S.PreviewContainer>
              <img src={previewUrl} alt={t("profileAvatar.previewAlt")} />
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

interface IProfileAvatar {
  avatar?: string | undefined | null;
  profileOwner: boolean;
  username: string;
  identifier: string;
}

export function ProfileAvatarComponent({ avatar, username, profileOwner, identifier }: IProfileAvatar) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && <UploadAvatarModal onClose={closeModal} identifier={identifier} />}
      <S.ProfileAvatar>
        {profileOwner ? <Upload onClick={openModal} /> : null}

        <img src={avatar || "/avatar-default.jpg"} alt={`avatar @${username}`} />
      </S.ProfileAvatar>
    </>
  );
}
