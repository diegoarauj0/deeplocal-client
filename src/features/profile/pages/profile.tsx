import { EditProfileTriggerComponent, type InterfaceDefaultValues } from "../components/editProfile/editProfileTrigger";
import { ProfileAvatarDisplayComponent } from "../components/profileAvatar/profileAvatarDisplay";
import { AlertTriangle } from "lucide-react";
import { EditBackgroundTrigger } from "../components/editBackground/editBackgroundTrigger";
import { ToggleThemeComponent } from "../../styles/components/toggleTheme";
import { useThemeContext } from "../../styles/contexts/theme.context";
import { AuthContext } from "../../auth/contexts/auth.context";
import { useUser } from "../hooks/reactQuery/useUser";
import { ThemeProvider } from "styled-components";
import { variants } from "../../styles/themes";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import * as S from "./profile.style";
import { useContext } from "react";
import { AxiosError } from "axios";

function ProfileLoading() {
  return (
    <S.Profile $background={undefined}>
      <S.ProfileTop $isBackgroundImage={false}>
        <S.AvatarSkeleton />
        <S.ProfileNicknameSkeleton />
        <S.ProfileUsernameSkeleton />
        <S.ProfileBioSkeleton />
      </S.ProfileTop>
      <S.LinksContainer>
        <S.LinksPlaceholder>
          <S.LinkSkeleton />
          <S.LinkSkeleton />
          <S.LinkSkeleton />
          <S.LinkSkeleton />
        </S.LinksPlaceholder>
      </S.LinksContainer>
    </S.Profile>
  );
}

function ProfileError({ error, identifier }: { error: Error; identifier?: string | undefined }) {
  const { t } = useTranslation("profile");

  if (error instanceof AxiosError && error.response?.data.error.code === "USER_NOT_FOUND_EXCEPTION") {
    return (
      <S.Profile $background={undefined}>
        <S.ProfileErrorContainer>
          <S.ProfileError>
            <S.ProfileErrorIcon>
              <AlertTriangle size={32} />
            </S.ProfileErrorIcon>
            <S.ProfileErrorContent>
              <p>{t("PAGES.PROFILE.NOT_FOUND_ERROR.TITLE", { identifier })}</p>
              <small>{t("PAGES.PROFILE.NOT_FOUND_ERROR.HELP")}</small>
            </S.ProfileErrorContent>
          </S.ProfileError>
        </S.ProfileErrorContainer>
      </S.Profile>
    );
  }

  return (
    <S.Profile $background={undefined}>
      <S.ProfileErrorContainer>
        <S.ProfileError>
          <S.ProfileErrorIcon>
            <AlertTriangle size={32} />
          </S.ProfileErrorIcon>
          <S.ProfileErrorContent>
            <p>{t("PAGES.PROFILE.UNEXPECTED_ERROR.TITLE")}</p>
            <small>{t("PAGES.PROFILE.UNEXPECTED_ERROR.HELP")}</small>
          </S.ProfileErrorContent>
        </S.ProfileError>
      </S.ProfileErrorContainer>
    </S.Profile>
  );
}

export function ProfilePage() {
  const { identifier } = useParams();
  const { currentUserId } = useContext(AuthContext);
  const { data, isPending, isError, error } = useUser(identifier || "");
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

  const isBackgroundImage = data?.user.background !== null;

  if (isPending) {
    return (
      <ThemeProvider theme={colorTheme}>
        <ProfileLoading />
      </ThemeProvider>
    );
  }

  if (isError) {
    return (
      <ThemeProvider theme={themeProps}>
        <S.Settings>
          <ToggleThemeComponent />
        </S.Settings>
        <ProfileError error={error} identifier={identifier} />
      </ThemeProvider>
    );
  }

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
