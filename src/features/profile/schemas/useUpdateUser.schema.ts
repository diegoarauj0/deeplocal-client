import joi from "joi";
import { userConstant } from "../../shared/constants/user.constant";

export interface IUpdateUserSchema {
  username?: string;
  nickname?: string;
  bio?: string;
}

export function useUpdateUserSchema() {
  return joi.object<IUpdateUserSchema>({
    username: joi
      .string()
      .min(userConstant.USERNAME_LENGTH_MIN)
      .max(userConstant.USERNAME_LENGTH_MAX)
      .optional()
      .alphanum(),
    nickname: joi
      .string()
      .min(userConstant.NICKNAME_LENGTH_MIN)
      .max(userConstant.NICKNAME_LENGTH_MAX)
      .optional()
      .alphanum(),
    bio: joi.string().min(userConstant.BIO_LENGTH_MIN).max(userConstant.BIO_LENGTH_MAX).optional(),
  });
}
