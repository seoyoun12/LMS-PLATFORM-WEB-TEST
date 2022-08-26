import React, { createContext, useContext } from "react";

export interface DialogConfig {
  title: string;
  description: string | React.ReactNode;
  variant?: "alert" | "confirm" | "prompt";
  confirmText?: string | "확인";
  cancelText?: string | "취소";
}

export const DialogContext = createContext<
  (options: DialogConfig) => Promise<boolean>
>(Promise.resolve);

export const useDialog = () => useContext(DialogContext);
