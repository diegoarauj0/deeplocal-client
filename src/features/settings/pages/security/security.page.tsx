import { Panel, PanelActions, PanelButton, PanelDescription, PanelHeader, PanelTitle } from "../panel.style";
import { logoutAllService, logoutService } from "../../../auth/services/auth.service";
import { deleteUserService } from "../../../profile/services/user.service";
import * as S from "./security.page.style";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../auth/contexts/auth.context";

export function SecuritySettingsPage() {
  const [includeCurrentSession, setIncludeCurrentSession] = useState(true);
  const { t } = useTranslation("settings");
  const { deauthenticate } = useAuthContext();

  const LOGOUT_NOTIFICATION_ID = "LOGOUT_NOTIFICATION";
  const LOGOUT_ALL_NOTIFICATION_ID = "LOGOUT_ALL_NOTIFICATION";
  const DELETE_USER_NOTIFICATION_ID = "DELETE_USER_NOTIFICATION";

  const AUTO_CLOSE = 6000;

  const handleCurrentLogout = async () => {
    toast.loading(t("PAGES.SECURITY.NOTIFICATION.LOGOUT_CURRENT.LOADING"), {
      toastId: LOGOUT_NOTIFICATION_ID,
      isLoading: true,
    });

    try {
      await logoutService();

      toast.update(LOGOUT_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.LOGOUT_CURRENT.SUCCESS"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "success",
      });

      deauthenticate();
    } catch {
      toast.update(LOGOUT_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.LOGOUT_CURRENT.ERROR"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "error",
      });
    }
  };

  const handleLogoutEverywhere = async () => {
    toast.loading(t("PAGES.SECURITY.NOTIFICATION.LOGOUT_ALL.LOADING"), {
      isLoading: true,
      toastId: LOGOUT_ALL_NOTIFICATION_ID,
    });

    try {
      await logoutAllService({ deleteCurrentSession: includeCurrentSession });

      toast.update(LOGOUT_ALL_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.LOGOUT_ALL.SUCCESS"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "success",
      });

      if (includeCurrentSession) deauthenticate();
    } catch {
      toast.update(LOGOUT_ALL_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.LOGOUT_ALL.ERROR"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    toast.loading(t("PAGES.SECURITY.NOTIFICATION.DELETE_ACCOUNT.LOADING"), {
      isLoading: true,
      toastId: DELETE_USER_NOTIFICATION_ID,
    });

    try {
      await deleteUserService();

      toast.update(DELETE_USER_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.DELETE_ACCOUNT.SUCCESS"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "success",
      });

      deauthenticate();
    } catch {
      toast.update(DELETE_USER_NOTIFICATION_ID, {
        render: t("PAGES.SECURITY.NOTIFICATION.DELETE_ACCOUNT.ERROR"),
        autoClose: AUTO_CLOSE,
        isLoading: false,
        type: "error",
      });
    }
  };

  return (
    <S.Page>
      <Panel $shadow>
        <PanelHeader>
          <PanelTitle>Deslogar sessão atual</PanelTitle>
        </PanelHeader>
        <PanelDescription>
          Encerre apenas a sessão em que você está conectado neste momento para reforçar a proteção do dispositivo.
        </PanelDescription>
        <PanelActions>
          <PanelButton type="button" onClick={handleCurrentLogout}>
            Deslogar sessão atual
          </PanelButton>
        </PanelActions>
      </Panel>

      <Panel $shadow>
        <PanelHeader>
          <PanelTitle>Deslogar todas as sessões</PanelTitle>
        </PanelHeader>
        <PanelDescription>
          Force a desconexão em todos os dispositivos. Você pode escolher se quer que a sessão atual também seja
          encerrada.
        </PanelDescription>
        <S.OptionRow>
          <S.CheckboxLabel>
            <S.Checkbox
              type="checkbox"
              checked={includeCurrentSession}
              onChange={(event) => setIncludeCurrentSession(event.target.checked)}
            />
            Incluir esta sessão
          </S.CheckboxLabel>
        </S.OptionRow>
        <PanelActions>
          <PanelButton type="button" onClick={handleLogoutEverywhere}>
            Deslogar todas as sessões
          </PanelButton>
        </PanelActions>
      </Panel>

      <Panel $shadow>
        <PanelHeader>
          <PanelTitle>Deletar usuário</PanelTitle>
        </PanelHeader>
        <PanelDescription>
          Remova permanentemente seu usuário e todos os dados associados. Essa ação não pode ser desfeita.
        </PanelDescription>
        <PanelActions>
          <S.DangerButton type="button" onClick={handleDeleteAccount}>
            Deletar usuário
          </S.DangerButton>
        </PanelActions>
      </Panel>
    </S.Page>
  );
}
