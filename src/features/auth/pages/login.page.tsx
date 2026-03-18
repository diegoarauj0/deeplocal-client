import { InputComponent } from "../../shared/components/input.component";
import { RectangleEllipsis, AtSign } from "lucide-react";
import { useLogin } from "../hooks/useLogin.hook";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router";
import * as S from "./common.style";

export function LoginPage() {
  const { form, handleLogin } = useLogin();

  return (
    <S.AuthCard>
      <S.AuthTitle>Acesse your Account</S.AuthTitle>
      <S.AuthDescription>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error, reiciendis culpa voluptate aperiam
        maiores deserunt maxime hic alias consectetur sed rerum in suscipit sit earum possimus adipisci architecto
        officia.
      </S.AuthDescription>
      <FormProvider {...form}>
        <S.AuthForm onSubmit={handleLogin}>
          <InputComponent type="email" placeholder="your email" label="Email:" name="email" logo={<AtSign />} />
          <InputComponent
            type="password"
            placeholder="your password"
            label="Password:"
            name="password"
            logo={<RectangleEllipsis />}
          />
          <S.AuthSubmit $isValid={form.formState.isValid} $isSubmitting={form.formState.isSubmitting}>
            Sign In
          </S.AuthSubmit>
        </S.AuthForm>
      </FormProvider>
      <S.LinksContainer>
        <Link to={"/auth/register"}>Already have any account? SignUp</Link>
      </S.LinksContainer>
    </S.AuthCard>
  );
}
