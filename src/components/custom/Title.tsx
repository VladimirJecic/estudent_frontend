import React from "react";
interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = "" }) => (
  <h2 className={`mb-4 ${className}`}>{children}</h2>
);

export default Title;
