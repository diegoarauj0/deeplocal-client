import { userConstant } from "../../../shared/constants/user.constant";
import { useTranslation } from "react-i18next";
import joi from "joi";

export interface IUpdateUserSchema {
  username?: string;
  nickname?: string;
  bio?: string;
}

export function useUpdateUserSchema() {
  const { t } = useTranslation("profile");

  return joi.object<IUpdateUserSchema>({
    username: joi
      .string()
      .min(userConstant.USERNAME_LENGTH_MIN)
      .max(userConstant.USERNAME_LENGTH_MAX)
      .optional()
      .alphanum()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_UPDATE_USER.USERNAME.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_UPDATE_USER.USERNAME.MIN", { min: userConstant.USERNAME_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_UPDATE_USER.USERNAME.MAX", { max: userConstant.USERNAME_LENGTH_MAX }),
        "string.alphanum": t("HOOKS.SCHEMAS.USE_UPDATE_USER.USERNAME.ALPHA"),
      }),
    nickname: joi
      .string()
      .min(userConstant.NICKNAME_LENGTH_MIN)
      .max(userConstant.NICKNAME_LENGTH_MAX)
      .optional()
      .alphanum()
      .messages({
        "string.empty": t("HOOKS.SCHEMAS.USE_UPDATE_USER.NICKNAME.REQUIRED"),
        "string.min": t("HOOKS.SCHEMAS.USE_UPDATE_USER.NICKNAME.MIN", { min: userConstant.NICKNAME_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_UPDATE_USER.NICKNAME.MAX", { max: userConstant.NICKNAME_LENGTH_MAX }),
        "string.alphanum": t("HOOKS.SCHEMAS.USE_UPDATE_USER.NICKNAME.ALPHA"),
      }),
    bio: joi
      .string()
      .min(userConstant.BIO_LENGTH_MIN)
      .max(userConstant.BIO_LENGTH_MAX)
      .optional()
      .messages({
        "string.min": t("HOOKS.SCHEMAS.USE_UPDATE_USER.BIO.MIN", { min: userConstant.BIO_LENGTH_MIN }),
        "string.max": t("HOOKS.SCHEMAS.USE_UPDATE_USER.BIO.MAX", { max: userConstant.BIO_LENGTH_MAX }),
      }),
  });
}
