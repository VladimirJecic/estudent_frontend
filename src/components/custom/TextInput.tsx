import { clear } from "console";
import React, { useState, forwardRef, useImperativeHandle } from "react";

interface TextInputProps {
  type?: string;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange: (value: string) => void;
  onClear?: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
  errorMessage?: string;
  hideDetails?: boolean | "auto";
  prependIcon?: string;
}

export interface TextInputHandle {
  clear: () => void;
}

const TextInput = forwardRef<TextInputHandle, TextInputProps>(
  (
    {
      type = "text",
      className = "",
      inputClassName = "",
      value = undefined,
      onChange,
      onClear,
      placeholder = "",
      isClearable = false,
      errorMessage,
      hideDetails = "auto",
      prependIcon,
    },
    ref
  ) => {
    const [hasText, setHasText] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const shouldShowDetails =
      hideDetails === false || (hideDetails === "auto" && !!errorMessage);

    // Expose clear method via ref
    useImperativeHandle(ref, () => ({
      clear: () => {
        if (onClear) {
          onClear("");
        } else {
          onChange("");
        }
        setHasText(false);
      },
    }));
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
              clear();
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
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
