import { useTranslation } from "react-i18next";
import { userConstant } from "../../../shared/constants/user.constant";
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
        "string.empty": t("schemas.login.email.required"),
        "any.required": t("schemas.login.email.required"),
        "string.email": t("schemas.login.email.invalid"),
        "string.min": t("schemas.login.email.min", { min: userConstant.EMAIL_LENGTH_MIN }),
        "string.max": t("schemas.login.email.max", { max: userConstant.EMAIL_LENGTH_MAX }),
      }),
    password: joi
      .string()
      .min(userConstant.PASSWORD_LENGTH_MIN)
      .max(userConstant.PASSWORD_LENGTH_MAX)
      .required()
      .messages({
        "string.empty": t("schemas.login.password.required"),
        "any.required": t("schemas.login.password.required"),
        "string.min": t("schemas.login.password.min", { min: userConstant.PASSWORD_LENGTH_MIN }),
        "string.max": t("schemas.login.password.max", { max: userConstant.PASSWORD_LENGTH_MAX }),
      }),
  });
}
