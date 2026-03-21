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
        "string.empty": t("schemas.register.username.required"),
        "any.required": t("schemas.register.username.required"),
        "string.min": t("schemas.register.username.min", { min: userConstant.USERNAME_LENGTH_MIN }),
        "string.max": t("schemas.register.username.max", { max: userConstant.USERNAME_LENGTH_MAX }),
        "string.alphanum": t("schemas.register.username.alpha"),
      }),
    email: joi
      .string()
      .email()
      .min(userConstant.EMAIL_LENGTH_MIN)
      .max(userConstant.EMAIL_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("schemas.register.email.required"),
        "any.required": t("schemas.register.email.required"),
        "string.email": t("schemas.register.email.invalid"),
        "string.min": t("schemas.register.email.min", { min: userConstant.EMAIL_LENGTH_MIN }),
        "string.max": t("schemas.register.email.max", { max: userConstant.EMAIL_LENGTH_MAX }),
      }),
    password: joi
      .string()
      .min(userConstant.PASSWORD_LENGTH_MIN)
      .max(userConstant.PASSWORD_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("schemas.register.password.required"),
        "any.required": t("schemas.register.password.required"),
        "string.min": t("schemas.register.password.min", { min: userConstant.PASSWORD_LENGTH_MIN }),
        "string.max": t("schemas.register.password.max", { max: userConstant.PASSWORD_LENGTH_MAX }),
      }),
  });
}
