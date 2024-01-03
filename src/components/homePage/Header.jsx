/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../assets/componentCSS/Header.css";
import { useState } from "react";

function Header({ handleSBCollapsing, logOut }) {
  const [hBarCollapsed, setHBarCollapsed] = useState(true);
  const handleHBCollapsing = () => {
    setHBarCollapsed(!hBarCollapsed);
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userString = user?.name + " (" + user?.indexNum + ")";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-primary"
          onClick={() => handleSBCollapsing()}
        >
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="headerDiv">
          Studentski servisi - <i>Fakultet organizacionih nauka</i>
        </div>
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
          <ul className="nav navbar-nav ml-auto header">
            {/* <li
              className="nav-item active"
              onClick={() => handleSBItemChange("rokovi")}
            >
              <a className="nav-link">Aktuelni Rokovi</a>
            </li>
            <li
              className="nav-item"
              onClick={() => handleSBItemChange("polozeni_ispiti")}
            >
              <a className="nav-link">Polozeni ispiti</a>
            </li>
            <li
              className="nav-item"
              onClick={() => handleSBItemChange("prijava_ispita")}
            >
              <a className="nav-link">Prijava ispita</a>
            </li> */}
            <li className="nav-item">
              <span className="fa fa-user"></span> {userString}
            </li>
            <li className="nav-item" onClick={() => logOut()}>
              Kraj rada<span className="fa fa-power-off"></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
