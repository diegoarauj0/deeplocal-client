import { Link } from "react-router";
import * as S from "./common.style";
import { InputComponent } from "../../shared/components/input.component";
import { AtSign, CircleUserRound, RectangleEllipsis } from "lucide-react";
import { useRegister } from "../hooks/useRegister.hook";
import { FormProvider } from "react-hook-form";

export function RegisterPage() {
  const { form, handleRegister } = useRegister();

  return (
    <S.AuthCard>
      <S.AuthTitle>Create Your Account</S.AuthTitle>
      <S.AuthDescription>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error, reiciendis culpa voluptate aperiam
        maiores deserunt maxime hic alias consectetur sed rerum in suscipit sit earum possimus adipisci architecto
        officia.
      </S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleRegister}>
          <InputComponent
            type="text"
            placeholder="your username"
            label="Username:"
            name="username"
            logo={<CircleUserRound />}
          />
          <InputComponent type="email" placeholder="your email" label="Email:" name="email" logo={<AtSign />} />
          <InputComponent
            type="password"
            placeholder="your password"
            label="Password:"
            name="password"
            logo={<RectangleEllipsis />}
          />
          <S.AuthSubmit $isValid={form.formState.isValid} $isSubmitting={form.formState.isSubmitting}>
            Sign Up
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/login"}>Dot's have any account? Sign In</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
