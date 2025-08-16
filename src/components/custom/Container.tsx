import React from "react";
import classNames from "classnames";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={classNames("custom-container", className)}>{children}</div>
);

export default Container;
