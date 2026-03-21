import { EditProfileTriggerComponent, type InterfaceDefaultValues } from "../components/editProfile/editProfileTrigger";
import { ProfileAvatarDisplayComponent } from "../components/profileAvatar/profileAvatarDisplay";
import { CreateLinkTriggerComponent } from "../../link/components/createLink/createLinkTrigger";
import { EditBackgroundTrigger } from "../components/editBackground/editBackgroundTrigger";
import { ToggleThemeComponent } from "../../styles/components/toggleTheme";
import { useThemeContext } from "../../styles/contexts/theme.context";
import { LinksComponent } from "../../link/components/links/links";
import { useLinks } from "../../link/hooks/reactQuery/useLinks";
import { AuthContext } from "../../auth/contexts/auth.context";
import { useUser } from "../hooks/reactQuery/useUser";
import { ThemeProvider } from "styled-components";
import { variants } from "../../styles/themes";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
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

function ProfileError({ error, identifier }: { error: Error | null; identifier?: string | undefined }) {
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
  const { themeProps: defaultTheme } = useThemeContext();
  const { currentUserId } = useContext(AuthContext);
  const { t } = useTranslation("profile");
  const { identifier } = useParams();
  
  const {
    data: userResponse,
    isPending: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useUser(identifier || "");

  const user = userResponse?.user;
  const userId = user?.ID;

  const { data: linksResponse, isPending: isLinksLoading, isError: isLinksError } = useLinks(userId);

  const links = linksResponse?.links ?? [];

  const isOwner = currentUserId === userId;

  const userTheme = user?.color ? variants[user.color] : defaultTheme;

  const hasBackgroundImage = Boolean(user?.background);

  const editProfileDefaultValues: InterfaceDefaultValues = {
    nickname: user?.nickname,
    username: user?.username,
    bio: user?.bio ?? undefined,
    color: user?.color ?? undefined,
  };

  if (isUserLoading || isLinksLoading) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <ProfileLoading />
      </ThemeProvider>
    );
  }

  if (isUserError || isLinksError) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <S.Settings>
          <ToggleThemeComponent />
        </S.Settings>
        <ProfileError error={userError} identifier={identifier} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={userTheme}>
      <S.Settings>
        <ToggleThemeComponent />
        {isOwner ? (
          <>
            <EditProfileTriggerComponent identifier={identifier || ""} defaultValues={editProfileDefaultValues} />
            <EditBackgroundTrigger identifier={identifier || ""} />
          </>
        ) : null}
      </S.Settings>
      <S.Profile $background={user?.background}>
        <S.ProfileTop $isBackgroundImage={hasBackgroundImage}>
          <ProfileAvatarDisplayComponent
            identifier={identifier || ""}
            profileOwner={isOwner}
            user={{
              avatar: user?.avatar,
              username: user?.username,
            }}
          />
          <S.ProfileNickname $isBackgroundImage={hasBackgroundImage}>
            <p>{user?.nickname}</p>
          </S.ProfileNickname>
          <S.ProfileUsername>
            <p>{user?.username}</p>
          </S.ProfileUsername>
          <S.ProfileBio>
            <p>{user?.bio ?? t("PAGES.PROFILE.EMPTY_BIO")}</p>
          </S.ProfileBio>
        </S.ProfileTop>
        <S.LinksContainer>
          <CreateLinkTriggerComponent userId={userId || ""} isOwner={isOwner} />
          <LinksComponent links={links} isOwner={isOwner} />
        </S.LinksContainer>
      </S.Profile>
    </ThemeProvider>
  );
}
