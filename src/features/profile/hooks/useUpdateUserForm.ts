import { useUpdateUserSchema, type IUpdateUserSchema } from "./schemas/useUpdateUser.schema";
import type { InterfaceDefaultValues } from "../components/editProfile/editProfileTrigger";
import { useAuthContext } from "../../auth/contexts/auth.context";
import type { ColorUser } from "../../shared/deeplocal.http";
import { useUpdateUser } from "./reactQuery/useUpdateUser";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface InterfaceUseUpdateUserForm {
  defaultValues: InterfaceDefaultValues;
  selectedTheme: ColorUser | undefined;  
  closePopup: () => void;
  identifier: string;
  autoClose: number;
  toastId: string;
}

export function useUpdateUserForm(props: InterfaceUseUpdateUserForm) {
  const { defaultValues, autoClose, toastId, identifier, closePopup, selectedTheme } = props;

  const { mutateAsync } = useUpdateUser(identifier);
  const updateUserSchema = useUpdateUserSchema();
  const { t } = useTranslation("profile");
  const { setCurrentUsername } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm<IUpdateUserSchema>({
    resolver: joiResolver(updateUserSchema, { abortEarly: false }),
    defaultValues: {
      username: defaultValues.username,
      nickname: defaultValues.nickname,
      bio: defaultValues.bio,
    },
    mode: "all",
  });

  const handleUpdateUser = form.handleSubmit(async (data) => {
    toast.loading(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.LOADING"), { toastId });

    try {
      if (data.username !== defaultValues.username) {
        toast.warning(t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_WARNING"), {
          autoClose: autoClose * 2,
          isLoading: false,
        });

        const { user } = await mutateAsync({ ...data, color: selectedTheme });

        toast.update(toastId, {
          render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.SUCCESS"),
          type: "success",
          autoClose: autoClose,
          isLoading: false,
        });

        if (user.username === data.username) {
          setCurrentUsername(user.username);
          await navigate(`/p/${user.username}`);
        }

        return closePopup();
      }

      await mutateAsync({ ...data, color: selectedTheme });

      toast.update(toastId, {
        render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.SUCCESS"),
        type: "success",
        autoClose: autoClose,
        isLoading: false,
      });

      closePopup();
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.error?.code;

        if (code === "VALIDATION_ERROR_EXCEPTION") {
          const details = error.response?.data?.error?.details ?? [];

          for (const detail of details) {
            const field = detail.name as "username" | "nickname" | "bio";
            const message = detail.reasons?.[0]?.message;

            if (message) {
              form.setError(field, { message });
            }
          }

          return toast.update(toastId, {
            render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.INVALID_FORM"),
            type: "error",
            isLoading: false,
            autoClose: autoClose,
          });
        }

        if (code === "USERNAME_ALREADY_IN_USE_EXCEPTION") {
          form.setError("username", { message: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_ALREADY_IN_USE") });

          return toast.update(toastId, {
            render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.USERNAME_ALREADY_IN_USE"),
            type: "error",
            isLoading: false,
            autoClose: autoClose,
          });
        }
      }

      return toast.update(toastId, {
        render: t("COMPONENTS.EDIT_PROFILE.NOTIFICATION.UNEXPECTED"),
        type: "error",
        isLoading: false,
        autoClose: autoClose,
      });
    }
  });

  return { form, handleUpdateUser };
}
