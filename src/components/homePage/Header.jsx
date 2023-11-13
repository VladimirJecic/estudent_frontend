/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../assets/main.js";
import { useState } from "react";
import { useNavigate } from "react-router";

function Header({ handleSBCollapsing }) {
  const [hBarCollapsed, setHBarCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleHBCollapsing = () => {
    //postaviti novu css klasu kojom ce se klikom na kollapse postaviti
    //rounded-circle 7rem
    setHBarCollapsed(!hBarCollapsed);
  };
  const logout = () => {
    //brise token i navlink na login
    navigate("/login");
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
          <ul className="nav navbar-nav ml-auto">
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
            <li className="nav-item" onClick={() => logout()}>
              <a className="nav-link">
                <span className="fa fa-user"></span> Vladimir Jecic (2017/0079)
                Kraj rada <span className="fa fa-power-off"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
