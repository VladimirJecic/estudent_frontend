import React from "react";
interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onClick?: (e: React.FormEvent) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  margin?: string;
  padding?: string;
  icon?: string;
  iconSize?: string; // npr. "1.2rem"
  buttonSize?: string; // npr. "2em"
  visible?: boolean; // manages visibility
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  tooltip,
  margin = "",
  padding = "p-2",
  title,
  icon,
  iconSize = "1.2rem",
  buttonSize,
  visible = true,
}) => {
  // If not visible, don't render anything
  if (!visible) return null;

  // If only icon and no children/title, use icon-only style
  const isIconOnly = !!icon && !children && !title;
  const colorClass =
    className && className.trim().length > 0 ? className : "bg-primary";

  const btnClass = [
    "custom-button",
    isIconOnly ? "icon-only" : "",
    margin,
    !isIconOnly ? padding : "",
    colorClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      style={buttonSize ? { width: buttonSize, height: buttonSize } : undefined}
    >
      {icon && (
        <span className={`${icon}`} style={{ fontSize: iconSize }}></span>
      )}
      {!isIconOnly && (title ? title : children)}
    </button>
  );
};

export default Button;
