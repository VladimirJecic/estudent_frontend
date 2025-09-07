import React from "react";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "w-100",
}) => (
  <div
    className={`d-flex flex-column justify-content-center align-items-center ${className}`}
  >
    {children}
  </div>
);

export default Container;
