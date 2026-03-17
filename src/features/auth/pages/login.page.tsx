import { Link } from "react-router"
import * as S from "./common.style"
import { InputComponent } from "../../shared/components/input.component"
import { RectangleEllipsis, AtSign } from "lucide-react"

export function LoginPage() {
  return (
    <S.AuthCard>
      <S.AuthTitle>Acesse your Account</S.AuthTitle>
      <S.AuthDescription>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error, reiciendis culpa voluptate aperiam
        maiores deserunt maxime hic alias consectetur sed rerum in suscipit sit earum possimus adipisci architecto
        officia.
      </S.AuthDescription>
      <S.AuthForm>
        <InputComponent type="email" placeholder="your email" label="Email:" logo={<AtSign />} />
        <InputComponent type="password" placeholder="your password" label="Password:" logo={<RectangleEllipsis />} />
        <S.AuthSubmit>Sign In</S.AuthSubmit>
      </S.AuthForm>
      <S.LinksContainer>
        <Link to={"/auth/register"}>Already have any account? SignUp</Link>
      </S.LinksContainer>
    </S.AuthCard>
  )
}
