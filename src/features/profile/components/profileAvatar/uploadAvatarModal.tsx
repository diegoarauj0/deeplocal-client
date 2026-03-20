import { useUpdateAvatar } from "../../hooks/reactQuery/useUpdateAvatar";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import * as S from "./profileAvatar.style";
import { PopupContext } from "../../../shared/contexts/popup.context";

interface InterfaceUploadAvatarModalProps {
  identifier: string;
}

export function UploadAvatarModalComponent({ identifier }: InterfaceUploadAvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closePopup } = useContext(PopupContext);
  const [file, setFile] = useState<File | null>(null);
  const { mutate } = useUpdateAvatar(identifier);
  const [isValid, setIsValid] = useState(false);
  const { t } = useTranslation("profile");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
    closePopup();
  };

  return (
    <S.Content>
      {previewUrl && (
        <S.PreviewContainer>
          <img src={previewUrl} alt={t("COMPONENTS.PROFILE_AVATAR.PREVIEW_ALT")} />
        </S.PreviewContainer>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <S.Submit
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        $isValid={isValid}
        $isSubmitting={isSubmitting}
      >
        {isSubmitting ? t("COMPONENTS.COMMON.SENDING") : t("COMPONENTS.COMMON.SEND")}
      </S.Submit>
    </S.Content>
  );
}
