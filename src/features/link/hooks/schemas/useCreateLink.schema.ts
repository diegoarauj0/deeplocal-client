import { normalizeUrl } from "../../../shared/utils/normalizeUrl";
import { linkConstant } from "../../constants/link.constant";
import { useTranslation } from "react-i18next";
import joi from "joi";

export interface InterfaceCreateLinkSchema {
  title: string;
  url: string;
}

export function useCreateLinkSchema() {
  const { t } = useTranslation("link");

  return joi.object<InterfaceCreateLinkSchema>({
    title: joi
      .string()
      .min(linkConstant.TITLE_LENGTH_MIN)
      .max(linkConstant.TITLE_LENGTH_MAX)
      .required()
      .alphanum()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_CREATE_LINK.TITLE.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_CREATE_LINK.TITLE.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_CREATE_LINK.TITLE.MIN", { min: linkConstant.TITLE_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_CREATE_LINK.TITLE.MAX", { max: linkConstant.TITLE_LENGTH_MAX }),
        "string.alphanum": t("HOOKS.SCHEMAS.USE_CREATE_LINK.TITLE.ALPHA"),
      }),
    url: joi
      .string()
      .required()
      .custom(normalizeUrl)
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_CREATE_LINK.URL.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_CREATE_LINK.URL.REQUIRED"),
        "any.invalid": t("HOOKS.SCHEMAS.USE_CREATE_LINK.URL.INVALID"),
      }),
  });
}
