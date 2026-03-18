import { userConstant } from "../../shared/constants/user.constant";
import joi from "joi";

export interface ILoginSchema {
  password: string;
  email: string;
}

export function useLoginSchema() {
  return joi.object<ILoginSchema>({
    email: joi.string().email().min(userConstant.EMAIL_LENGTH_MIN).max(userConstant.EMAIL_LENGTH_MAX).required(),
    password: joi.string().min(userConstant.PASSWORD_LENGTH_MIN).max(userConstant.PASSWORD_LENGTH_MAX).required(),
  });
}
