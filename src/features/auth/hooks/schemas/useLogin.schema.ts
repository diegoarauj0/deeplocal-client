import { userConstant } from "../../../shared/constants/user.constant";
import { useTranslation } from "react-i18next";
import joi from "joi";

export interface InterfaceLoginSchema {
  password: string;
  email: string;
}

export function useLoginSchema() {
  const { t } = useTranslation();

  return joi.object<InterfaceLoginSchema>({
    email: joi
      .string()
      .email()
      .min(userConstant.EMAIL_LENGTH_MIN)
      .max(userConstant.EMAIL_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_LOGIN.EMAIL.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_LOGIN.EMAIL.REQUIRED"),
        "string.email": t("HOOKS.SCHEMAS.USE_LOGIN.EMAIL.INVALID"),
        "string.min": t("HOOKS.SCHEMAS.USE_LOGIN.EMAIL.MIN", { min: userConstant.EMAIL_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_LOGIN.EMAIL.MAX", { max: userConstant.EMAIL_LENGTH_MAX }),
      }),
    password: joi
      .string()
      .min(userConstant.PASSWORD_LENGTH_MIN)
      .max(userConstant.PASSWORD_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_LOGIN.PASSWORD.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_LOGIN.PASSWORD.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_LOGIN.PASSWORD.MIN", { min: userConstant.PASSWORD_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_LOGIN.PASSWORD.MAX", { max: userConstant.PASSWORD_LENGTH_MAX }),
      }),
  });
}
