import { useState, type PropsWithChildren, type ReactNode } from "react";
import { PopupModal } from "../components/popupModal/popupModal";
import { PopupContext } from "../contexts/popup.context";

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<{
    content: ReactNode | null;
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    content: null,
    title: "",
    description: "",
  });

  const openPopup = (content: ReactNode, title = "", description = "") => {
    setPopup({ isOpen: true, content, title, description });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, content: null, title: "", description: "" });
  };

  return (
    <PopupContext.Provider value={{ ...popup, openPopup, closePopup }}>
      {children}
      <PopupModal />
    </PopupContext.Provider>
  );
}
