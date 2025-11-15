import React from "react";
import ReactSelect, { SingleValue } from "react-select";

interface SelectOption {
  label: string;
  value: any;
  data: any;
}

interface SelectProps<T> {
  items: T[];
  itemTitle: keyof T;
  itemValue?: keyof T;
  value?: T | null;
  onChange: (item: T | null) => void;
  placeholder?: string;
  label?: string;
  returnObject?: boolean;
  isClearable?: boolean;
  className?: string;
}

function Select<T extends Record<string, any>>({
  items,
  itemTitle,
  itemValue,
  value,
  onChange,
  placeholder = "Izaberi...",
  label,
  returnObject = false,
  isClearable = true,
  className = "",
}: SelectProps<T>) {
  const options: SelectOption[] = items.map((item) => ({
    label: String(item[itemTitle]),
    value: itemValue ? item[itemValue] : item,
    data: item,
  }));

  const selectedOption =
    value !== null && value !== undefined
      ? options.find((opt) =>
          itemValue
            ? opt.value === value[itemValue]
            : JSON.stringify(opt.data) === JSON.stringify(value)
        ) || null
      : null;

  const handleChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption === null) {
      onChange(null);
    } else {
      onChange(returnObject ? selectedOption.data : selectedOption.value);
    }
  };

  return (
    <div className={`custom-select-wrapper ${className}`}>
      {label && <label className="custom-select-label">{label}</label>}
      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable={isClearable}
        classNamePrefix="custom-select"
      />
    </div>
  );
}

export default Select;
