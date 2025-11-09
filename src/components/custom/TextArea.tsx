import React, { useState, forwardRef, useImperativeHandle } from "react";
import "@/assets/componentCSS/TextArea.css";

interface TextAreaProps {
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
  onClear?: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  readonly?: boolean;
}

export interface TextAreaHandle {
  clear: () => void;
}

const TextArea = forwardRef<TextAreaHandle, TextAreaProps>(
  (
    {
      className = "",
      inputClassName = "",
      onChange = () => {},
      onClear,
      placeholder = "",
      initialValue = "",
      readonly = false,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [hasText, setHasText] = useState(initialValue.length > 0);
    const [isFocused, setIsFocused] = useState(false);

    // Single clear function
    const clear = () => {
      setInputValue("");
      setHasText(false);
      if (onClear) {
        onClear("");
      } else {
        onChange("");
      }
    };
    // Expose clear method via ref
    useImperativeHandle(ref, () => ({ clear }));
    return (
      <div
        className={`custom-text-input${hasText ? " input-has-value" : ""}${
          isFocused ? " input-focused" : ""
        } ${className}`}
      >
        {placeholder && (
          <label
            className={`floating-label${
              hasText || isFocused ? " floating-label--float" : ""
            }`}
          >
            {placeholder}
          </label>
        )}
        <textarea
          name="textArea"
          value={inputValue}
          className={`${inputClassName}${
            readonly ? " bg-light secondary" : ""
          }`}
          aria-label={placeholder || "Text area"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            if (readonly) return;
            const newValue = e.target.value;
            setInputValue(newValue);
            setHasText(newValue.length > 0);
            onChange(newValue);
          }}
          readOnly={readonly}
        />
        {!readonly && (
          <button
            name="clearButton"
            type="button"
            className={`clear-btn ${hasText ? "hasText" : "hasNoText"}`}
            onClick={clear}
            title="Clear"
            tabIndex={hasText ? 0 : -1}
          >
            <span className="pt-1">×</span>
          </button>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
