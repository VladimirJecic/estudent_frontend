import React from "react";

interface ButonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Buton: React.FC<ButonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <div className="custom-buton">
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  </div>
);

export default Buton;
