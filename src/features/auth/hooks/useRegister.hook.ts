import { useRegisterSchema, type IRegisterSchema } from "../schemas/useRegister.schema";
import { ThemeContext } from "../../styles/theme.context";
import { joiResolver } from "@hookform/resolvers/joi";
import { SignUpService } from "../auth.service";
import { AuthContext } from "../auth.context";
import { useContext, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useRegister() {
  const { authenticate } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const registerSchema = useRegisterSchema();
  const toastId = useId();

  const form = useForm<IRegisterSchema>({
    resolver: joiResolver(registerSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: IRegisterSchema) {
    toast.loading("Creating your account...", { theme, toastId });

    try {
      const { tokens } = await SignUpService(data);

      authenticate(tokens);

      toast.update(toastId, {
        render: "Account created and logged in successfully",
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
        render: "Invalid form. Please review the highlighted fields.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (code === "USERNAME_ALREADY_IN_USE_EXCEPTION") {
      return form.setError("username", { message: "This username is already in use." });
    }

    if (code === "EMAIL_ALREADY_IN_USE_EXCEPTION") {
      return form.setError("email", { message: "This email is already in use." });
    }

    return toast.update(toastId, {
      render: "Unable to create your account. Please try again later.",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleRegister: form.handleSubmit(onSubmit), form };
}
