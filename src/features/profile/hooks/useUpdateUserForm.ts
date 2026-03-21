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
    defaultValues: {
      username: defaultValues.username,
      nickname: defaultValues.nickname,
      bio: defaultValues.bio,
    },
    mode: "all",
  });

  return { form };
}
