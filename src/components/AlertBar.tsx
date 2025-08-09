import React, { useEffect, useState } from "react";
import alertService, { AlertState } from "@/services/AlertService";

const iconForType = (type: AlertState["type"]): JSX.Element => {
  if (type === "success") {
    return (
      <span
        className="fa-solid fa-circle-check alert-bar-icon success"
        aria-hidden="true"
      ></span>
    );
  }
  if (type === "error") {
    return (
      <span
        className="fa-solid fa-circle-exclamation alert-bar-icon error"
        aria-hidden="true"
      ></span>
    );
  }
  return <></>;
};

const AlertBar: React.FC = () => {
  const [alertState, setAlertState] = useState<AlertState>(alertService.state);

  useEffect(() => {
    alertService.setListener(setAlertState);
    return () => {
      alertService.removeListener();
    };
  }, []);

  if (!alertState.isVisible) return null;

  return (
    <div
      className={`alert-bar d-flex align-items-center shadow ${
        alertState.type === "success"
          ? "bg-success-subtle text-success"
          : "bg-danger-subtle text-danger"
      }`}
      role="alert"
    >
      {iconForType(alertState.type)}
      <span className="alert-bar-message flex-grow-1">
        {alertState.message}
      </span>
      <button
        type="button"
        aria-label="Close"
        className="alert-bar-close btn btn-link p-0 ms-3"
        onClick={() => alertService.hide()}
      >
        ×
      </button>
    </div>
  );
};

export default AlertBar;
