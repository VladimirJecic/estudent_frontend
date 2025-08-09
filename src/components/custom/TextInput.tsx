import React, { useState } from "react";

interface TextInputProps {
  // value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  // value,
  onChange,
  placeholder = "",
  isClearable = false,
}) => {
  const [hasText, setHasText] = useState(false);
  return (
    <div className="custom-text-input">
      <input
        className="mx-"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setHasText(e.target.value.length > 0);
          onChange(e.target.value);
        }}
      />
      {isClearable && hasText && (
        <button
          className="clear-btn"
          onClick={() => onChange("")}
          title="Clear"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TextInput;
