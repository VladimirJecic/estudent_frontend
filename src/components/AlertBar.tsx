import React, { JSX } from "react";
import { useAlertService } from "@/context/AlertServiceContext";

const iconForType = (type: "success" | "error"): JSX.Element => {
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
  const { alertState, hide } = useAlertService();
  if (!alertState.isVisible) return null;
  return (
    <div
      className={`alert-bar shadow ${
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
        onClick={hide}
      >
        ×
      </button>
    </div>
  );
};

export default AlertBar;
