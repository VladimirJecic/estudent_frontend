import React from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  label,
  ariaLabel,
  name,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel || label}
        disabled={disabled}
        className="form-check-input"
      />
      {label && <label className="ms-2 mb-0 form-check-label">{label}</label>}
    </div>
  );
};

export default CheckBox;
