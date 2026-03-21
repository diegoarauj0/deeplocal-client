import { ProfileAvatarTriggerComponent } from "./profileAvatarTrigger";
import type { IPublicUser } from "../../../shared/deeplocal.http";
import * as S from "./profileAvatar.style";

interface InterfaceProfileAvatarDisplay {
  profileOwner: boolean;
  identifier: string;
  user: {
    username: IPublicUser["username"] | undefined | null;
    avatar: IPublicUser["avatar"] | undefined | null;
  };
}

export function ProfileAvatarDisplayComponent(props: InterfaceProfileAvatarDisplay) {
  const { identifier, profileOwner, user } = props;

  return (
    <>
      <S.ProfileAvatarDisplay>
        <ProfileAvatarTriggerComponent identifier={identifier} profileOwner={profileOwner} />

        <img src={user.avatar || "/avatar-default.jpg"} alt={`avatar @${user.username}`} />
      </S.ProfileAvatarDisplay>
    </>
  );
}
