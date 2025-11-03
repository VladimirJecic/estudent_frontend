import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: string; // Dinamička širina, npr. "70vw"
  height?: string; // Dinamička visina, npr. "20vh"
}

function Container({
  children,
  className = "",
  width = "100%",
  height,
}: ContainerProps) {
  const uniqueSuffix = React.useMemo(
    () => Math.random().toString(36).substring(2, 8),
    []
  );

  const wrapperClass = `container-${uniqueSuffix}`;

  React.useEffect(() => {
    const styleId = `container-style-${uniqueSuffix}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    let style = `.${wrapperClass} { width: ${width} !important;`;
    if (height) {
      style += ` height: ${height} !important;`;
    }
    style += " }";
    styleTag.innerHTML = style;
  }, [width, height, uniqueSuffix, wrapperClass]);

  return (
    <div
      className={`${wrapperClass} d-flex justify-content-center align-items-center ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default Container;
