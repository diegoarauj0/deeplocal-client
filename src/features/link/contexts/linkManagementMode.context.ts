import { createContext, useContext } from "react";

interface InterfaceLinkManagementMode {
  desabilitar: () => void;
  enable: () => void;
  isLinkManagementMode: boolean;
}

export const LinkManagementModeContext = createContext<InterfaceLinkManagementMode>({
  desabilitar: () => {},
  enable: () => {},
  isLinkManagementMode: false,
});

export const useLinkManagementModeContext = () => useContext(LinkManagementModeContext);
