import { InputComponent } from "../../../shared/components/input/input";
import { PopupContext } from "../../../shared/contexts/popup.context";
import { useCreateUserForm } from "../../hooks/useCreateUserForm";
import { useCreateLink } from "../../hooks/reactQuery/useCreateLink";
import { FormProvider } from "react-hook-form";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BookmarkPlus, Link2 } from "lucide-react";
import * as S from "./createLink.style";

export interface InterfaceCreateLinkModalProps {
  userId: string;
}

export function CreateLinkModalComponent({ userId }: InterfaceCreateLinkModalProps) {
  const { closePopup } = useContext(PopupContext);
  const { t } = useTranslation("link");
  const { form } = useCreateUserForm();
  const createLinkMutation = useCreateLink(userId);

  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await createLinkMutation.mutateAsync(values);
      toast.success(t("COMPONENTS.CREATE_LINK.NOTIFICATION.SUCCESS"));
      form.reset();
      closePopup();
    } catch {
      toast.error(t("COMPONENTS.CREATE_LINK.NOTIFICATION.UNEXPECTED"));
    }
  });

  return (
    <FormProvider {...form}>
      <S.Form onSubmit={handleSubmit}>
        <InputComponent
          label={t("COMPONENTS.CREATE_LINK.FORM.LABELS.TITLE")}
          placeholder={t("COMPONENTS.CREATE_LINK.FORM.PLACEHOLDERS.TITLE")}
          name="title"
          type="text"
          logo={<BookmarkPlus />}
        />
        <InputComponent
          label={t("COMPONENTS.CREATE_LINK.FORM.LABELS.URL")}
          placeholder={t("COMPONENTS.CREATE_LINK.FORM.PLACEHOLDERS.URL")}
          name="url"
          type="text"
          logo={<Link2 />}
        />
        <S.SubmitButton type="submit" disabled={!isValid} $isValid={isValid} $isSubmitting={isSubmitting}>
          {createLinkMutation.isPending
            ? t("COMPONENTS.CREATE_LINK.FORM.SUBMIT_LOADING")
            : t("COMPONENTS.CREATE_LINK.FORM.SUBMIT")}
        </S.SubmitButton>
      </S.Form>
    </FormProvider>
  );
}
