import React, { createContext, useContext, useState, ReactNode } from "react";
import AlertBar from "@/components/custom/AlertBar";
import { AlertServiceContextType, AlertState } from "@/types/items";
import log from "loglevel";
import { EStudentError } from "@/types/errors";

const AlertServiceContext = createContext<AlertServiceContextType | undefined>(
  undefined
);

export const AlertServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertState, setAlertState] = useState<AlertState>({
    isVisible: false,
    type: "success",
    message: "",
  });

  const autoHide = () => {
    setTimeout(() => {
      setAlertState((prev) => ({ ...prev, isVisible: false }));
    }, 12000);
  };

  const alert = (message: string, isPermanent?: boolean) => {
    setAlertState({ isVisible: true, type: "success", message });
    if (!isPermanent) {
      autoHide();
    }
  };

  const error = (message: string, isPermanent?: boolean) => {
    setAlertState({ isVisible: true, type: "error", message });
    if (!isPermanent) {
      autoHide();
    }
    if (error instanceof EStudentError) {
      log.warn("Server error occurred", error);
    } else {
      log.error("Unknown error occurred", error);
    }
  };

  const hide = () => {
    setAlertState((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <AlertServiceContext.Provider
      value={{ alert, error, hide, alertState, setAlertState }}
    >
      {children}
      {/* Render AlertBar globally */}
      <AlertBar />
    </AlertServiceContext.Provider>
  );
};

export const useAlertService = (): AlertServiceContextType => {
  const context = useContext(AlertServiceContext);
  if (!context) {
    throw new Error(
      "useAlertService must be used within an AlertServiceProvider"
    );
  }
  return context;
};
