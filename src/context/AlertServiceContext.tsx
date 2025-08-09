import React, { createContext, useContext, useState, ReactNode } from "react";

export type AlertType = "success" | "error";

interface AlertState {
  isVisible: boolean;
  type: AlertType;
  title: string;
  message: string;
}

interface AlertServiceContextType {
  alert: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  hide: () => void;
}

const AlertServiceContext = createContext<AlertServiceContextType | undefined>(
  undefined
);

export const AlertServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertState, setAlertState] = useState<AlertState>({
    isVisible: false,
    type: "success",
    title: "",
    message: "",
  });

  const autoHide = () => {
    setTimeout(() => {
      setAlertState((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const alert = (title: string, message: string) => {
    setAlertState({ isVisible: true, type: "success", title, message });
    autoHide();
  };

  const error = (title: string, message: string) => {
    setAlertState({ isVisible: true, type: "error", title, message });
    autoHide();
  };

  const hide = () => {
    setAlertState((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <AlertServiceContext.Provider value={{ alert, error, hide }}>
      {children}
      {alertState.isVisible && (
        <div className={`window-background ${alertState.type}`}>
          <div className="window-content">
            <div className="window-header">
              <b className="window-title col-10">{alertState.title}</b>
              <button className="close col-2" onClick={hide}>
                ×
              </button>
            </div>
            <div className="window-body">
              {alertState.message.split("\n").map((msgLine, key) => (
                <p
                  key={key}
                  className={`window-message ${
                    alertState.type === "success" ? "green" : "red"
                  }`}
                >
                  {msgLine}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
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
