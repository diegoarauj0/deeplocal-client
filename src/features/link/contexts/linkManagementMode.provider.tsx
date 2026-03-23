import { LinkManagementModeContext } from "./linkManagementMode.context";
import { useState, type PropsWithChildren } from "react";

export function LinkManagementModeProvider({ children }: PropsWithChildren) {
  const [isLinkManagementMode, setMode] = useState<boolean>(false);

  const desabilitar = () => setMode(false);
  const enable = () => setMode(true);

  return (
    <LinkManagementModeContext.Provider value={{ isLinkManagementMode, desabilitar, enable }}>
      {children}
    </LinkManagementModeContext.Provider>
  );
}
