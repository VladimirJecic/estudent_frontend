import React from "react";
interface ButonProps {
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
}

const Buton: React.FC<ButonProps> = ({
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
}) => {
  // If only icon and no children/title, use icon-only style
  const isIconOnly = !!icon && !children && !title;
  const btnClass = [
    "custom-button text-white",
    isIconOnly ? "icon-only" : "",
    margin,
    isIconOnly ? "bg-primary" : "bg-primary " + padding,
    className,
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
    >
      {icon && <span className={`${icon} buton-icon`}></span>}
      {!isIconOnly && (title ? title : children)}
    </button>
  );
};

export default Buton;
