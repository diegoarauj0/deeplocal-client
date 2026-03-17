import { Link } from "react-router"
import * as S from "./common.style"
import { InputComponent } from "../../shared/components/input.component"
import { AtSign, CircleUserRound, RectangleEllipsis } from "lucide-react"

export function RegisterPage() {
  return (
    <S.AuthCard>
      <S.AuthTitle>Create Your Account</S.AuthTitle>
      <S.AuthDescription>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error, reiciendis culpa voluptate aperiam
        maiores deserunt maxime hic alias consectetur sed rerum in suscipit sit earum possimus adipisci architecto
        officia.
      </S.AuthDescription>
      <S.AuthForm>
        <InputComponent type="text" placeholder="your username" label="Username:" logo={<CircleUserRound />} />
        <InputComponent type="email" placeholder="your email" label="Email:" logo={<AtSign />} />
        <InputComponent type="password" placeholder="your password" label="Password:" logo={<RectangleEllipsis />} />
        <S.AuthSubmit>Sign Up</S.AuthSubmit>
      </S.AuthForm>
      <S.LinksContainer>
        <Link to={"/auth/login"}>Dot's have any account? Sign In</Link>
      </S.LinksContainer>
    </S.AuthCard>
  )
}
