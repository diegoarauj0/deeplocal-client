import { userConstant } from "../../../shared/constants/user.constant";
import { useTranslation } from "react-i18next";
import joi from "joi";

export interface IRegisterSchema {
  username: string;
  password: string;
  email: string;
}

export function useRegisterSchema() {
  const { t } = useTranslation();

  return joi.object<IRegisterSchema>({
    username: joi
      .string()
      .min(userConstant.USERNAME_LENGTH_MIN)
      .max(userConstant.USERNAME_LENGTH_MAX)
      .alphanum()
      .required()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_REGISTER.USERNAME.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_REGISTER.USERNAME.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_REGISTER.USERNAME.MIN", { min: userConstant.USERNAME_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_REGISTER.USERNAME.MAX", { max: userConstant.USERNAME_LENGTH_MAX }),
        "string.alphanum": t("HOOKS.SCHEMAS.USE_REGISTER.USERNAME.ALPHA"),
      }),
    email: joi
      .string()
      .email()
      .min(userConstant.EMAIL_LENGTH_MIN)
      .max(userConstant.EMAIL_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_REGISTER.EMAIL.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_REGISTER.EMAIL.REQUIRED"),
        "string.email": t("HOOKS.SCHEMAS.USE_REGISTER.EMAIL.INVALID"),
        "string.min": t("HOOKS.SCHEMAS.USE_REGISTER.EMAIL.MIN", { min: userConstant.EMAIL_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_REGISTER.EMAIL.MAX", { max: userConstant.EMAIL_LENGTH_MAX }),
      }),
    password: joi
      .string()
      .min(userConstant.PASSWORD_LENGTH_MIN)
      .max(userConstant.PASSWORD_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_REGISTER.PASSWORD.REQUIRED"),
        "any.required": t("HOOKS.SCHEMAS.USE_REGISTER.PASSWORD.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_REGISTER.PASSWORD.MIN", { min: userConstant.PASSWORD_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_REGISTER.PASSWORD.MAX", { max: userConstant.PASSWORD_LENGTH_MAX }),
      }),
  });
}
