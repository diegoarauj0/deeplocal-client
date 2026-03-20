import { useRegisterSchema, type IRegisterSchema } from "./schemas/useRegister.schema";
import { useAuthContext } from "../contexts/auth.context";
import { signUpService } from "../services/auth.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useRegister() {
  const registerSchema = useRegisterSchema();
  const { authenticate } = useAuthContext();
  const { t } = useTranslation("auth");

  const toastId = "NOTIFICATION_USE_REGISTER"

  const form = useForm<IRegisterSchema>({
    resolver: joiResolver(registerSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: IRegisterSchema) {
    toast.loading(t("HOOKS.REGISTER.NOTIFICATION.LOADING"), { toastId });

    try {
      const { tokens, user } = await signUpService(data);

      authenticate(tokens, user.username, user.ID);

      toast.update(toastId, {
        render: t("HOOKS.REGISTER.NOTIFICATION.SUCCESS"),
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error: unknown) {
    if (error instanceof AxiosError) {
      const code = error.response?.data?.error?.code;

      if (code === "VALIDATION_ERROR_EXCEPTION") {
        const details = error.response?.data?.error?.details ?? [];

        for (const detail of details) {
          const field = detail.name as "email" | "password" | "username";
          const message = detail.reasons?.[0]?.message;

          if (message) {
            form.setError(field, { message });
          }
        }

        return toast.update(toastId, {
          render: t("HOOKS.REGISTER.NOTIFICATION.INVALID_FORM"),
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }

      if (code === "USERNAME_ALREADY_IN_USE_EXCEPTION") {
        return form.setError("username", { message: t("HOOKS.REGISTER.NOTIFICATION.USERNAME_ALREADY_IN_USE") });
      }

      if (code === "EMAIL_ALREADY_IN_USE_EXCEPTION") {
        return form.setError("email", { message: t("HOOKS.REGISTER.NOTIFICATION.EMAIL_ALREADY_IN_USE") });
      }
    }

    return toast.update(toastId, {
      render: t("HOOKS.REGISTER.NOTIFICATION.UNEXPECTED"),
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleRegister: form.handleSubmit(onSubmit), form };
}
