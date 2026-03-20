import { useParams } from "react-router";
import * as S from "./profile.style";
import { useUser } from "../hooks/reactQuery/useUser";
import { useContext } from "react";
import { AuthContext } from "../../auth/contexts/auth.context";
import { ToggleThemeComponent } from "../../styles/components/toggleTheme";
import { ThemeProvider } from "styled-components";
import { variants } from "../../styles/themes";
import { useThemeContext } from "../../styles/contexts/theme.context";
import { useTranslation } from "react-i18next";
import { EditProfileTriggerComponent, type InterfaceDefaultValues } from "../components/editProfile/editProfileTrigger";
import { EditBackgroundTrigger } from "../components/editBackground/editBackgroundTrigger";
import { ProfileAvatarDisplayComponent } from "../components/profileAvatar/profileAvatarDisplay";

export function ProfilePage() {
  const { identifier } = useParams();
  const { currentUserId } = useContext(AuthContext);
  const { data } = useUser(identifier || "");
  const { t } = useTranslation("profile");
  const { themeProps } = useThemeContext();

  const profileOwner = currentUserId === data?.user.ID;

  const color = data?.user?.color;
  const colorTheme = color ? variants[color] : themeProps;

  const defaultValues: InterfaceDefaultValues = {
    nickname: data?.user.nickname ?? undefined,
    username: data?.user.username ?? undefined,
    bio: data?.user.bio ?? undefined,
    color: data?.user.color ?? undefined,
  };

  const isBackgroundImage = data?.user.background !== null

  return (
    <ThemeProvider theme={colorTheme}>
      <S.Settings>
        <ToggleThemeComponent />
        {profileOwner ? (
          <>
            <EditProfileTriggerComponent identifier={identifier || ""} defaultValues={defaultValues} />
            <EditBackgroundTrigger identifier={identifier || ""} />
          </>
        ) : null}
      </S.Settings>
      <S.Profile $background={data?.user.background}>
        <S.ProfileTop $isBackgroundImage={isBackgroundImage}>
          <ProfileAvatarDisplayComponent
            identifier={identifier || ""}
            profileOwner={profileOwner}
            user={{
              avatar: data?.user.avatar,
              username: data?.user.username,
            }}
          />
          <S.ProfileNickname $isBackgroundImage={isBackgroundImage}>
            <p>{data?.user.nickname}</p>
          </S.ProfileNickname>
          <S.ProfileUsername>
            <p>{data?.user.username}</p>
          </S.ProfileUsername>
          <S.ProfileBio>
            <p>{data?.user.bio ?? t("profilePage.emptyBio")}</p>
          </S.ProfileBio>
        </S.ProfileTop>
        <S.LinksContainer></S.LinksContainer>
      </S.Profile>
    </ThemeProvider>
  );
}
