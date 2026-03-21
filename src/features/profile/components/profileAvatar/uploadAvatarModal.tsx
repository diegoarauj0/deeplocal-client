import { useUpdateAvatar } from "../../hooks/reactQuery/useUpdateAvatar";
import { useTranslation } from "react-i18next";
import { createRef, useContext, useEffect, useState } from "react";
import * as S from "./profileAvatar.style";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { userConstant } from "../../../shared/constants/user.constant";
import mini from "mime-types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface InterfaceUploadAvatarModalProps {
  identifier: string;
}

export function UploadAvatarModalComponent({ identifier }: InterfaceUploadAvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closePopup } = useContext(PopupContext);
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync } = useUpdateAvatar(identifier);
  const [isValid, setIsValid] = useState(false);
  const { t } = useTranslation("profile");
  const fileInputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const toastId = "NOTIFICATION_UPLOAD_AVATAR_MODAL";
  const selectedFileToastId = "NOTIFICATION_SELECTED_FILE";
  const AUTO_CLOSE = 3000;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile || !userConstant.AVATAR_CONTENT_TYPE.includes(selectedFile.type)) {
      const contentType = mini.extension(selectedFile?.type || "");
      const acceptedContentTypes: string[] = [];

      userConstant.BACKGROUND_CONTENT_TYPE.forEach((contentType) => {
        const type = mini.extension(contentType);
        if (type) acceptedContentTypes.push(type);
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return toast.warning(
        t("COMPONENTS.PROFILE_AVATAR.NOTIFICATION.INVALID_CONTENT_TYPE", {
          contentType,
          acceptedContentTypes: acceptedContentTypes.join(", "),
        }),
        {
          autoClose: AUTO_CLOSE * 2,
          toastId: selectedFileToastId,
        },
      );
    }

    setFile(selectedFile);
    setIsValid(true);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!file) return;

    toast.loading(t("COMPONENTS.PROFILE_AVATAR.NOTIFICATION.LOADING"), { toastId });

    try {
      setIsSubmitting(true);

      await mutateAsync(file);

      toast.update(toastId, {
        render: t("COMPONENTS.PROFILE_AVATAR.NOTIFICATION.SUCCESS"),
        type: "success",
        autoClose: AUTO_CLOSE,
        isLoading: false,
      });

      setIsSubmitting(false);
      setPreviewUrl(null);
      closePopup();
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code;

        if (code === "INVALID_CONTENT_TYPE_EXCEPTION") {
          const contentType = mini.extension(error.response?.data.details.contentType);
          const acceptedContentTypes: string[] = [];

          error.response?.data.details.acceptedContentTypes.forEach((contentType: string) => {
            const type = mini.extension(contentType);
            if (type) acceptedContentTypes.push(type);
          });

          return toast.update(toastId, {
            render: t("COMPONENTS.PROFILE_AVATAR.NOTIFICATION.INVALID_CONTENT_TYPE", {
              contentType,
              acceptedContentTypes: acceptedContentTypes.join(", "),
            }),
            type: "error",
            isLoading: false,
            autoClose: AUTO_CLOSE,
          });
        }
      }

      return toast.update(toastId, {
        render: t("COMPONENTS.PROFILE_AVATAR.NOTIFICATION.UNEXPECTED"),
        type: "error",
        isLoading: false,
        autoClose: AUTO_CLOSE,
      });
    }

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

      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />

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
