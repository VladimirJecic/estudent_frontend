import React, { useState } from "react";

interface TextInputProps {
  type?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
  errorMessage?: string;
  hideDetails?: boolean | "auto";
  prependIcon?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  className = "",
  inputClassName = "",
  value = undefined,
  onChange,
  placeholder = "",
  isClearable = false,
  errorMessage,
  hideDetails = "auto",
  prependIcon,
}) => {
  const [hasText, setHasText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowDetails =
    hideDetails === false || (hideDetails === "auto" && !!errorMessage);
  // showFloating is not needed, floating label is handled by class
  return (
    <div
      className={`custom-text-input${hasText ? " input-has-value" : ""}${
        isFocused ? " input-focused" : ""
      } ${className}`}
    >
      {prependIcon && (
        <span className="prepend-icon">
          <i className={`fa ${prependIcon}`}></i>
        </span>
      )}
      {/* Floating label always present, animates up on focus or text */}
      {placeholder && (
        <label
          className={`floating-label${
            hasText || isFocused ? " floating-label--float" : ""
          }`}
        >
          {placeholder}
        </label>
      )}
      <input
        name="textInput"
        value={value}
        className={inputClassName}
        type={type}
        aria-label={placeholder || "Text input"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          setHasText(e.target.value.length > 0);
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent clearing the input
          }
        }}
      />
      {isClearable && (
        <button
          name="clearButton"
          type="button"
          className={`clear-btn ${hasText ? "hasText" : "hasNoText"}`}
          onClick={() => {
            onChange("");
            setHasText(false);
          }}
          title="Clear"
          tabIndex={hasText ? 0 : -1}
        >
          <span className="pt-1">×</span>
        </button>
      )}
      <div
        className={shouldShowDetails ? "details" : "details details--hidden"}
      >
        {shouldShowDetails && errorMessage && (
          <div className="warning" role="alert">
            <p className="errLine">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
