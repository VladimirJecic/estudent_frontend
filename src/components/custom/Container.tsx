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
  const hasJustifyContent = className.match(
    /justify-content-(start|center|end|between|around|evenly)/
  );
  const defaultJustifyContentCenter = hasJustifyContent
    ? ""
    : "justify-content-center";
  const hasAlignedItems = className.match(
    /align-items-(start|center|end|baseline|stretch)/
  );
  const defaultAlignItemsCenter = hasAlignedItems ? "" : "align-items-center";
  const hasWidthClass = className.match(/w-\d+/);
  const shouldApplyWidthProp = !hasWidthClass;

  React.useEffect(() => {
    const styleId = `container-style-${uniqueSuffix}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    let style = "";
    if (shouldApplyWidthProp) {
      style = `.${wrapperClass} { width: ${width} !important;`;
      if (height) {
        style += ` height: ${height} !important;`;
      }
      style += " }";
    } else {
      if (height) {
        style = `.${wrapperClass} { height: ${height} !important; }`;
      }
    }
    styleTag.innerHTML = style;
  }, [width, height, uniqueSuffix, wrapperClass, shouldApplyWidthProp]);

  return (
    <div
      className={`${wrapperClass} d-flex ${defaultJustifyContentCenter} ${defaultAlignItemsCenter} ${className}`.trim()}
      style={shouldApplyWidthProp ? { width: width } : undefined}
    >
      {children}
    </div>
  );
}

export default Container;
