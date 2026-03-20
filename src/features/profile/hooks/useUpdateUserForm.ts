import { useUpdateUserSchema, type IUpdateUserSchema } from "./schemas/useUpdateUser.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import type { InterfaceDefaultValues } from "../components/editProfile/editProfileTrigger";

interface InterfaceUseUpdateUserForm {
  defaultValues: InterfaceDefaultValues;
}

export function useUpdateUserForm({ defaultValues }: InterfaceUseUpdateUserForm) {
  const updateUserSchema = useUpdateUserSchema();

  const form = useForm<IUpdateUserSchema>({
    resolver: joiResolver(updateUserSchema, { abortEarly: false }),
    defaultValues: defaultValues,
    mode: "all",
  });

  return { form };
}
