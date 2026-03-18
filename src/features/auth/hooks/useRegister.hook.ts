import { useRegisterSchema, type IRegisterSchema } from "../schemas/useRegister.schema";
import { ThemeContext } from "../../styles/theme.context";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignUpService } from "../auth.service";
import { AuthContext } from "../auth.context";
import { useContext, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export function useRegister() {
  const { authenticate } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation("auth");
  const registerSchema = useRegisterSchema(t);
  const toastId = useId();

  const form = useForm<IRegisterSchema>({
    resolver: joiResolver(registerSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: IRegisterSchema) {
    toast.loading(t("hooks.register.toast.loading"), { theme, toastId });

    try {
      const { tokens } = await SignUpService(data);

      authenticate(tokens);

      toast.update(toastId, {
        render: t("hooks.register.toast.success"),
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
        const field = detail.name as "email" | "password" | "username";
        const message = detail.reasons?.[0]?.message;

        if (message) {
          form.setError(field, { message });
        }
      }

      return toast.update(toastId, {
        render: t("hooks.register.toast.invalidForm"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (code === "USERNAME_ALREADY_IN_USE_EXCEPTION") {
      return form.setError("username", { message: t("hooks.register.toast.usernameTaken") });
    }

    if (code === "EMAIL_ALREADY_IN_USE_EXCEPTION") {
      return form.setError("email", { message: t("hooks.register.toast.emailTaken") });
    }

    return toast.update(toastId, {
      render: t("hooks.register.toast.unexpected"),
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleRegister: form.handleSubmit(onSubmit), form };
}
