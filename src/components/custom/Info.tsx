import React from "react";
import Container from "./Container";
interface InfoProps {
  children: React.ReactNode;
  className?: string;
}

const Info: React.FC<InfoProps> = ({ className = "w-100", children }) => (
  <Container className={`bg-info text-center ${className}`}>
    <h5> {children} </h5>
  </Container>
);

export default Info;
