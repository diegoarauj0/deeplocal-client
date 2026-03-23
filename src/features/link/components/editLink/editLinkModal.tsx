import { InputComponent } from "../../../shared/components/input/input";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { useUpdateLink } from "../../hooks/reactQuery/useUpdateLink";
import { useCreateLinkSchema, type InterfaceCreateLinkSchema } from "../../hooks/schemas/useCreateLink.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BookmarkPlus, Link2 } from "lucide-react";
import * as S from "./editLink.style";
import { AxiosError } from "axios";
import { useContext } from "react";
import type { InterfacePublicLink } from "../../../shared/deeplocal.http";

export interface InterfaceEditLinkModalProps {
  link: InterfacePublicLink;
}

export function EditLinkModalComponent({ link }: InterfaceEditLinkModalProps) {
  const { closePopup } = useContext(PopupContext);
  const { t } = useTranslation("link");
  const updateLinkMutation = useUpdateLink(link.userId);
  const createLinkSchema = useCreateLinkSchema();

  const form = useForm<InterfaceCreateLinkSchema>({
    resolver: joiResolver(createLinkSchema, { abortEarly: false }),
    mode: "all",
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updateLinkMutation.mutateAsync({
        id: link.ID,
        title: values.title,
        url: values.url,
      });

      toast.success(t("COMPONENTS.EDIT_LINK.NOTIFICATION.SUCCESS"));
      closePopup();
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code;

        if (code === "VALIDATION_ERROR_EXCEPTION") {
          const details = error.response?.data?.error?.details ?? [];

          for (const detail of details) {
            const field = detail.name as "title" | "url";
            const message = detail.reasons?.[0]?.message;

            if (message) {
              form.setError(field, { message });
            }
          }

          return toast.error(t("COMPONENTS.EDIT_LINK.NOTIFICATION.INVALID_FORM"));
        }
      }

      toast.error(t("COMPONENTS.EDIT_LINK.NOTIFICATION.UNEXPECTED"));
    }
  });

  return (
    <FormProvider {...form}>
      <S.Form onSubmit={handleSubmit}>
        <InputComponent
          label={t("COMPONENTS.EDIT_LINK.FORM.LABELS.TITLE")}
          placeholder={t("COMPONENTS.EDIT_LINK.FORM.PLACEHOLDERS.TITLE")}
          name="title"
          type="text"
          logo={<BookmarkPlus />}
        />
        <InputComponent
          label={t("COMPONENTS.EDIT_LINK.FORM.LABELS.URL")}
          placeholder={t("COMPONENTS.EDIT_LINK.FORM.PLACEHOLDERS.URL")}
          name="url"
          type="text"
          logo={<Link2 />}
        />
        <S.SubmitButton type="submit" disabled={!isValid} $isValid={isValid} $isSubmitting={isSubmitting}>
          {isSubmitting ? t("COMPONENTS.EDIT_LINK.FORM.SUBMIT_LOADING") : t("COMPONENTS.EDIT_LINK.FORM.SUBMIT")}
        </S.SubmitButton>
      </S.Form>
    </FormProvider>
  );
}
