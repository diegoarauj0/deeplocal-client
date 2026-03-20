import { createContext, useContext, type ReactNode } from "react";

interface InterfacePopupContext {
  openPopup: (content: ReactNode | null, title: string, description: string) => void;
  content: ReactNode | null;
  closePopup: () => void;
  description: string;
  isOpen: boolean;
  title: string;
}

export const PopupContext = createContext<InterfacePopupContext>({
  closePopup: () => {},
  openPopup: () => {},
  description: "",
  content: null,
  isOpen: false,
  title: "",
});

export const usePopupContext = () => useContext(PopupContext)
