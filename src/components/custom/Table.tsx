import React from "react";

type TableHeader = {
  title: string;
  value: string;
};

interface TableProps<T> {
  headers: TableHeader[];
  items: T[];
  width?: string; // e.g. "50vw"
  colWidths?: number[]; // e.g. [2,1,1]
  templates?: Partial<
    Record<Extract<TableHeader["value"], string>, (item: T) => React.ReactNode>
  >;
  className?: string;
  footer?: string;
}

// Helper to inject dynamic CSS for table width
function injectWrapperWidth(width: string) {
  const styleId = "custom-table-wrapper-width";
  let styleTag = document.getElementById(styleId);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = `.custom-table-wrapper { width: ${width} !important; }`;
}

// Helper to inject dynamic CSS for column widths and max-width
function injectColWidthClass(
  className: string,
  width: string,
  maxWidth?: string
) {
  if (!document.getElementById(className)) {
    const style = document.createElement("style");
    style.id = className;
    style.innerHTML = `.${className} { width: ${width} !important;${
      maxWidth ? ` max-width: ${maxWidth} !important;` : ""
    } }`;
    document.head.appendChild(style);
  }
}

// Helper to calculate col width classes
function getColWidthClasses(
  headers: TableHeader[],
  colWidths?: number[]
): string[] {
  if (colWidths && colWidths.length === headers.length) {
    const total = colWidths.reduce((a, b) => a + b, 0);
    return colWidths.map((w, idx) => {
      const percent = `${(w / total) * 100}%`;
      const className = `col-width-${w}-${idx}`;
      injectColWidthClass(className, percent);
      return className;
    });
  } else {
    // fallback: equal widths, set max-width
    return headers.map((_, idx) => {
      const percent = `${100 / headers.length}%`;
      const className = `col-width-auto-${idx}`;
      injectColWidthClass(className, percent, percent);
      return className;
    });
  }
}
function Table<T>({
  headers,
  items,
  width = "100%",
  colWidths,
  templates = {},
  className = "",
  footer,
}: TableProps<T>) {
  // Generate a unique suffix for this table instance
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  // Helper to calculate col width classes with unique suffix
  function getColWidthClasses(
    headers: TableHeader[],
    colWidths?: number[]
  ): string[] {
    if (colWidths && colWidths.length === headers.length) {
      const total = colWidths.reduce((a, b) => a + b, 0);
      return colWidths.map((w, idx) => {
        const percent = `${(w / total) * 100}%`;
        const className = `col-width-${w}-${idx}-${uniqueSuffix}`;
        injectColWidthClass(className, percent);
        return className;
      });
    } else {
      // fallback: equal widths, set max-width
      return headers.map((_, idx) => {
        const percent = `${100 / headers.length}%`;
        const className = `col-width-auto-${idx}-${uniqueSuffix}`;
        injectColWidthClass(className, percent, percent);
        return className;
      });
    }
  }
  const colWidthClasses = getColWidthClasses(headers, colWidths);
  // Unique wrapper class for this table instance
  const wrapperClass = `custom-table-wrapper-${uniqueSuffix}`;
  // Inject unique wrapper width style
  function injectUniqueWrapperWidth(width: string) {
    const styleId = `custom-table-wrapper-width-${uniqueSuffix}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `.${wrapperClass} { width: ${width} !important; }`;
  }
  injectUniqueWrapperWidth(width);
  return (
    <div className={`${wrapperClass} ${className}`.trim()}>
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className={colWidthClasses[idx]}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {headers.map((header, colIdx) => {
                const cellValue = (item as any)[header.value];
                const template = templates[header.value];
                return (
                  <td key={colIdx} className={colWidthClasses[colIdx]}>
                    {template ? template(item) : cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              <td className="font-weight-bold w-100" colSpan={headers.length}>
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default Table;
