import React, { createContext, useContext, useState, ReactNode } from "react";
import AlertBar from "@/components/AlertBar";
import { AlertServiceContextType, AlertState } from "@/types/items";
import HTMLResponseError from "@/error/HTMLResponseError";
import ServerError from "@/error/ServerError";
import log from "loglevel";

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
    }, 4000);
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
    if (error instanceof HTMLResponseError) {
      log.warn("HTML response received");
    } else if (error instanceof ServerError) {
      log.debug(error);
    } else {
      log.error("Unknown error occurred");
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
