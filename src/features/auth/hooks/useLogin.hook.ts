import { useLoginSchema, type ILoginSchema } from "../schemas/useLogin.schema";
import { ThemeContext } from "../../styles/theme.context";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignInService } from "../auth.service";
import { AxiosError } from "axios";
import { AuthContext } from "../auth.context";
import { useTranslation } from "react-i18next";

export function useLogin() {
  const { authenticate } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation("auth");
  const loginSchema = useLoginSchema(t);
  const toastId = useId();

  const form = useForm<ILoginSchema>({
    resolver: joiResolver(loginSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: ILoginSchema) {
    toast.loading(t("hooks.login.toast.loading"), { theme, toastId });

    try {
      const { tokens, user } = await SignInService(data);

      authenticate(tokens, user.username, user.ID);

      toast.update(toastId, {
        render: t("hooks.login.toast.success"),
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error: unknown) {
    if (!(error instanceof AxiosError)) return false;

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
        render: t("hooks.login.toast.invalidForm"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (code === "INVALID_CREDENTIALS_EXCEPTION") {
      const message = t("hooks.login.toast.invalidCredentials");

      form.setError("email", { message });
      form.setError("password", { message });

      return toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    toast.update(toastId, {
      render: t("hooks.login.toast.unexpected"),
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleLogin: form.handleSubmit(onSubmit), form };
}
