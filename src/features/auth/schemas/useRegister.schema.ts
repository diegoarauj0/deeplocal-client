import { userConstant } from "../../shared/constants/user.constant";
import joi from "joi";

export interface IRegisterSchema {
  username: string;
  password: string;
  email: string;
}

export function useRegisterSchema() {
  return joi.object<IRegisterSchema>({
    username: joi.string().min(userConstant.USERNAME_LENGTH_MIN).max(userConstant.USERNAME_LENGTH_MAX).alphanum().required(),
    email: joi.string().email().min(userConstant.EMAIL_LENGTH_MIN).max(userConstant.EMAIL_LENGTH_MAX).required(),
    password: joi.string().min(userConstant.PASSWORD_LENGTH_MIN).max(userConstant.PASSWORD_LENGTH_MAX).required(),
  });
}
