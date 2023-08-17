/* eslint-disable jsx-a11y/anchor-is-valid */
import "./assets/main.js";
import { useState } from "react";

function Header({ handleSBCollapsing }) {
  const [hBarCollapsed, setHBarCollapsed] = useState(true);
  const handleHBCollapsing = () => {
    setHBarCollapsed(!hBarCollapsed);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-primary"
          onClick={handleSBCollapsing}
        >
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
        <button
          className="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleHBCollapsing}
        >
          <i className="fa fa-bars"></i>
        </button>

        <div
          className={`collapse navbar-collapse ${hBarCollapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
