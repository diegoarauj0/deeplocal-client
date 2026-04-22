import { useLoginSchema, type InterfaceLoginSchema } from "./schemas/useLogin.schema";
import { useAuthContext } from "../contexts/auth.context";
import { signInService } from "../services/auth.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useLogin() {
  const { authenticate } = useAuthContext();
  const { t } = useTranslation("auth");
  const loginSchema = useLoginSchema();
  
  const toastId = "NOTIFICATION_USE_LOGIN"
  
  const form = useForm<InterfaceLoginSchema>({
    resolver: joiResolver(loginSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: InterfaceLoginSchema) {
    toast.loading(t("HOOKS.USE_LOGIN.NOTIFICATION.LOADING"), { toastId });

    try {
      const { tokens, user } = await signInService(data);

      authenticate(tokens, user.username, user.ID);

      toast.update(toastId, {
        render: t("HOOKS.USE_LOGIN.NOTIFICATION.SUCCESS"),
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
          const field = detail.name as "email" | "password";
          const message = detail.reasons?.[0]?.message;

          if (message) {
            form.setError(field, { message });
          }
        }

        return toast.update(toastId, {
          render: t("HOOKS.USE_LOGIN.NOTIFICATION.INVALID_FORM"),
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }

      if (code === "INVALID_CREDENTIALS_EXCEPTION") {
        const message = t("HOOKS.USE_LOGIN.NOTIFICATION.INVALID_CREDENTIALS");

        form.setError("email", { message });
        form.setError("password", { message });

        return toast.update(toastId, {
          render: message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    }

    toast.update(toastId, {
      render: t("HOOKS.USE_LOGIN.NOTIFICATION.UNEXPECTED"),
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleLogin: form.handleSubmit(onSubmit), form };
}
