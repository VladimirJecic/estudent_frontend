import React, { useState, ReactNode, createContext, useContext } from "react";
import "../assets/componentCSS/NavigationDrawer.css";

interface NavigationDrawerProps {
  expandOnHover?: boolean;
  children: ReactNode;
  className?: string;
  expanded?: boolean; // controlled expanded state
  onExpandedChange?: (expanded: boolean) => void; // controlled expanded setter
}

interface DrawerContextType {
  expanded: boolean;
}

const DrawerContext = createContext<DrawerContextType>({ expanded: false });
export const useDrawer = () => useContext(DrawerContext);

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  expandOnHover = false,
  children,
  className = "",
  expanded: controlledExpanded,
  onExpandedChange,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const setExpanded = (val: boolean) => {
    if (onExpandedChange) onExpandedChange(val);
    else setInternalExpanded(val);
  };
  return (
    <DrawerContext.Provider value={{ expanded }}>
      <aside
        className={`navigation-drawer d-flex flex-column bg-primary text-white position-fixed h-100 ${
          expanded ? "expanded" : "collapsed"
        } ${className}`}
        onMouseEnter={() => expandOnHover && setExpanded(true)}
        onMouseLeave={() => expandOnHover && setExpanded(false)}
      >
        {children}
      </aside>
    </DrawerContext.Provider>
  );
};

interface ListProps {
  children: ReactNode;
  className?: string;
}

export const List: React.FC<ListProps> = ({ children, className = "" }) => (
  <ul className={`nav flex-column ${className}`}>{children}</ul>
);

interface ListItemProps {
  prependIcon?: string;
  title: string;
  to?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  prependIcon,
  title,
  to,
  onClick,
  children,
  className = "",
}) => {
  const { expanded } = useDrawer();
  const content = (
    <div className="d-flex flex-row align-items-center w-100">
      <span className="me-2 icon-wrapper p-3">
        <span className={prependIcon}></span>
      </span>
      {expanded && <span className="nav-text">{title}</span>}
      {children}
    </div>
  );
  return (
    <li className={`nav-item ${className}`}>
      {to ? (
        <a
          href={to}
          className="nav-link text-white d-flex align-items-center"
          onClick={onClick}
        >
          {content}
        </a>
      ) : (
        <div
          className={`nav-link text-white d-flex align-items-center${
            onClick ? " pointer" : ""
          }`}
          onClick={onClick}
        >
          {content}
        </div>
      )}
    </li>
  );
};
