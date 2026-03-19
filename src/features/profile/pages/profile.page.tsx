import { ProfileAvatarComponent } from "../components/profileAvatar/profileAvatar.component";
import { useParams } from "react-router";
import * as S from "./profile.style";
import { useUser } from "../hooks/useUser.hook";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import { ToggleThemeComponent } from "../../styles/components/toggleTheme.component";
import { EditProfileComponent } from "../components/editProfile/editProfile.component";
import { EditBackgroundComponent } from "../components/editBackground/editBackground.component";
import { ThemeProvider } from "styled-components";
import { baseThemes, variants } from "../../styles/themes";
import { ThemeContext } from "../../styles/theme.context";
import { useTranslation } from "react-i18next";

export function ProfilePage() {
  const { identificar } = useParams();
  const { currentUserId } = useContext(AuthContext);
  const { data } = useUser(identificar || "");
  const { theme } = useContext(ThemeContext);
  const themes = baseThemes[theme];
  const { t } = useTranslation("profile");

  const profileOwner = currentUserId === data?.user.ID;

  const colorTheme = { ...themes };

  if (data?.user?.color) {
    Object.assign(colorTheme, variants[data.user.color]);
  }

  return (
    <ThemeProvider theme={colorTheme}>
      <S.Settings>
        <ToggleThemeComponent />
        {profileOwner ? (
          <>
            <EditProfileComponent
              identifier={identificar || ""}
              defaultValues={{
                nickname: data.user.nickname,
                username: data.user.username,
                bio: data.user.bio ?? undefined,
              }}
            />
            <EditBackgroundComponent identifier={identificar || ""} />
          </>
        ) : null}
      </S.Settings>
      <S.Profile $background={data?.user.background}>
        <S.ProfileTop $isBackgroundImage={data?.user.background !== null}>
          <ProfileAvatarComponent
            identifier={identificar || ""}
            profileOwner={profileOwner}
            avatar={data?.user.avatar}
            username={data?.user.username ?? ""}
          />
          <S.ProfileNickname>
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
