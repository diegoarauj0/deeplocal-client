import { useLoginSchema, type ILoginSchema } from "../schemas/useLogin.schema";
import { ThemeContext } from "../../styles/theme.context";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignInService } from "../auth.service";
import { AxiosError } from "axios";
import { AuthContext } from "../auth.context";

export function useLogin() {
  const { authenticate } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const loginSchema = useLoginSchema();
  const toastId = useId();

  const form = useForm<ILoginSchema>({
    resolver: joiResolver(loginSchema, { abortEarly: false }),
    mode: "all",
  });

  async function onSubmit(data: ILoginSchema) {
    toast.loading("Logging in...", { theme, toastId });

    try {
      const { tokens } = await SignInService(data);

      authenticate(tokens);

      toast.update(toastId, {
        render: "Successfully logged in",
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
        render: "Invalid form.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (code === "INVALID_CREDENTIALS_EXCEPTION") {
      const message = "Invalid email or password.";

      form.setError("email", { message });
      form.setError("password", { message });

      return toast.update(toastId, {
        render: "Invalid email or password.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    toast.update(toastId, {
      render: "We were unable to log in to your account, please try again later.",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return { handleLogin: form.handleSubmit(onSubmit), form };
}
