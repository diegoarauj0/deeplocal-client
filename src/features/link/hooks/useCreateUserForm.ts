import { useCreateLinkSchema, type InterfaceCreateLinkSchema } from "./schemas/useCreateLink.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

export function useCreateUserForm() {
  const createLinkSchema = useCreateLinkSchema();

  const form = useForm<InterfaceCreateLinkSchema>({
    resolver: joiResolver(createLinkSchema, { abortEarly: false }),
    mode: "all",
  });

  return { form };
}
