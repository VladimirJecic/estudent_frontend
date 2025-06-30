import React from "react";
import "@/../assets/componentCSS/TextInput.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  isClearable = false,
}) => {
  return (
    <div className="custom-text-input">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isClearable && value && (
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
