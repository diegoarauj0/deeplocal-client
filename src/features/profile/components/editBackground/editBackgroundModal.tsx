import { useUpdateBackground } from "../../hooks/reactQuery/useUpdateBackground";
import type { IEditBackgroundTriggerProps } from "./editBackgroundTrigger";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import * as S from "./editBackground.style";
import { PopupContext } from "../../../shared/contexts/popup.context";

export function EditBackgroundModalComponent({ identifier }: IEditBackgroundTriggerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { closePopup } = useContext(PopupContext);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const { mutate } = useUpdateBackground(identifier);
  const { t } = useTranslation("profile");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;

    setFile(selectedFile);
    setIsValid(true);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  }

  async function handleSubmit() {
    if (!file) return;

    setIsSubmitting(true);

    mutate(file);

    setIsSubmitting(false);
    setPreviewUrl(null);
    closePopup();
  }

  return (
    <S.Content>
      {previewUrl && (
        <S.PreviewContainer>
          <img src={previewUrl} alt={t("COMPONENTS.EDIT_BACKGROUND.PREVIEW_ALT")} />
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
