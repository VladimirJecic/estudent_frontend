import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: string; // Dinamička širina, npr. "70vw"
}

function Container({
  children,
  className = "",
  width = "100%",
}: ContainerProps) {
  const uniqueSuffix = React.useMemo(
    () => Math.random().toString(36).substring(2, 8),
    []
  );

  const wrapperClass = `container-style-${uniqueSuffix}`;

  React.useEffect(() => {
    const styleId = `container-style-${uniqueSuffix}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `.${wrapperClass} { width: ${width} !important; }`;
  }, [width, uniqueSuffix, wrapperClass]);

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${className} ${wrapperClass}`.trim()}
    >
      {children}
    </div>
  );
}

export default Container;
