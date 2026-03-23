import { AxiosError } from "axios";
import { type ChangeEvent, createRef, useContext, useEffect, useState } from "react";
import mini from "mime-types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { userConstant } from "../../../shared/constants/user.constant";
import { useUpdateLinkIcon } from "../../hooks/reactQuery/useUpdateLinkIcon";
import type { InterfacePublicLink } from "../../../shared/deeplocal.http";
import * as S from "./uploadLinkIconModal.style";

interface InterfaceUploadLinkIconModalProps {
  link: InterfacePublicLink;
}

export function UploadLinkIconModalComponent({ link }: InterfaceUploadLinkIconModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const fileInputRef = createRef<HTMLInputElement>();
  const { closePopup } = useContext(PopupContext);
  const { mutateAsync } = useUpdateLinkIcon(link.userId);
  const { t } = useTranslation("link");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const toastId = "NOTIFICATION_UPLOAD_LINK_ICON_MODAL";
  const selectedFileToastId = "NOTIFICATION_SELECTED_FILE_LINK_ICON";
  const AUTO_CLOSE = 3000;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!userConstant.AVATAR_CONTENT_TYPE.includes(selectedFile.type)) {
      const contentType = mini.extension(selectedFile?.type || "") || selectedFile.type;
      const acceptedContentTypes = userConstant.AVATAR_CONTENT_TYPE
        .map((type) => mini.extension(type))
        .filter((type): type is string => Boolean(type));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFile(null);
      setIsValid(false);
      setPreviewUrl(null);

      return toast.warning(
        t("COMPONENTS.LINK_ICON_UPLOAD.NOTIFICATION.INVALID_CONTENT_TYPE", {
          contentType,
          acceptedContentTypes: acceptedContentTypes.join(", "),
        }),
        {
          autoClose: AUTO_CLOSE * 2,
          toastId: selectedFileToastId,
        },
      );
    }

    const url = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setIsValid(true);
    setPreviewUrl(url);
  };

  const handleSubmit = async () => {
    if (!file || !previewUrl) return;

    toast.loading(t("COMPONENTS.LINK_ICON_UPLOAD.NOTIFICATION.LOADING"), { toastId });

    try {
      setIsSubmitting(true);

      await mutateAsync({ linkId: link.ID, file, previewUrl });

      toast.update(toastId, {
        render: t("COMPONENTS.LINK_ICON_UPLOAD.NOTIFICATION.SUCCESS"),
        type: "success",
        autoClose: AUTO_CLOSE,
        isLoading: false,
      });

      setIsSubmitting(false);
      setFile(null);
      setIsValid(false);
      setPreviewUrl(null);
      closePopup();
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code;

        if (code === "INVALID_CONTENT_TYPE_EXCEPTION") {
          const contentType = mini.extension(error.response?.data?.details.contentType) || "";
          const acceptedContentTypes = error.response?.data?.details.acceptedContentTypes ?? [];
          const extensions: string[] = [];

          acceptedContentTypes.forEach((content: string) => {
            const extension = mini.extension(content);
            if (extension) extensions.push(extension);
          });

          setIsSubmitting(false);

          return toast.update(toastId, {
            render: t("COMPONENTS.LINK_ICON_UPLOAD.NOTIFICATION.INVALID_CONTENT_TYPE", {
              contentType,
              acceptedContentTypes: extensions.join(", "),
            }),
            type: "error",
            isLoading: false,
            autoClose: AUTO_CLOSE,
          });
        }
      }

      setIsSubmitting(false);

      return toast.update(toastId, {
        render: t("COMPONENTS.LINK_ICON_UPLOAD.NOTIFICATION.UNEXPECTED"),
        type: "error",
        isLoading: false,
        autoClose: AUTO_CLOSE,
      });
    }
  };

  return (
    <S.Content>
      {previewUrl && (
        <S.PreviewContainer>
          <img src={previewUrl} alt={t("COMPONENTS.LINK_ICON_UPLOAD.PREVIEW_ALT")} />
        </S.PreviewContainer>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />

      <S.Submit
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        $isValid={isValid}
        $isSubmitting={isSubmitting}
      >
        {isSubmitting
          ? t("COMPONENTS.LINK_ICON_UPLOAD.COMMON.SENDING")
          : t("COMPONENTS.LINK_ICON_UPLOAD.COMMON.SEND")}
      </S.Submit>
    </S.Content>
  );
}
