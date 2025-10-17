import { createContext, useState } from "react";
import TosatBarFun from "../components/TosatBarFun";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  function showHideToast(textContent) {
    setContent(textContent);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      <TosatBarFun open={open} content={content} />
      <ToastContext.Provider value={{ showHideToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};
