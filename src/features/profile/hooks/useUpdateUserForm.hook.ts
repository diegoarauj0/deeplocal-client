import { useUpdateUserSchema, type IUpdateUserSchema } from "../schemas/useUpdateUser.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

export function useUpdateUserForm() {
  const updateUserSchema = useUpdateUserSchema();

  const form = useForm<IUpdateUserSchema>({
    resolver: joiResolver(updateUserSchema, { abortEarly: false }),
    mode: "all",
  });

  return { form };
}
