import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoFon from "@/assets/logo-fon.png";
import { useUser } from "@/context/UserContext";

const AppLayout = () => {
  const navigate = useNavigate();
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [headerBarCollapsed, setHeaderBarCollapsed] = useState(true);
  const { user, setUser } = useUser();
  // Adjust sidebar state based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    const handleResize = () => {
      if (mediaQuery.matches) setSideBarCollapsed(false);
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const logOut = () => {
    setUser(undefined);
  };
  const isAdmin = user?.role === "admin";

  return (
    <div className="wrapper d-flex align-items-stretch">
      {/* Sidebar */}
      <nav id="sidebar" className={sideBarCollapsed ? "active" : ""}>
        <h1>
          <button
            className="logo logo-btn"
            type="button"
            tabIndex={-1}
            aria-label="Logo"
          >
            <img src={logoFon} alt="Logo" className="logo-img" />
          </button>
        </h1>
        <ul className="list-unstyled components mb-5">
          <li>
            <button
              type="button"
              className="nav-btn"
              onClick={() => navigate("/rokovi")}
            >
              <span className="far fa-calendar-check" aria-hidden="true"></span>{" "}
              Aktuelni rokovi
            </button>
          </li>
          {isAdmin ? (
            <>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => navigate("/upis-ocena")}
                >
                  <span className="fa-solid fa-pen-to-square"></span> Upis ocena
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => navigate("/izvestaj-polaganja")}
                >
                  <span className="fa-solid fa-file-lines"></span> Izveštaj
                  polaganja ispita
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => navigate("/izvestaj_predmeta")}
                >
                  <span className="fa-solid fa-chart-simple"></span> Izveštaj o
                  predmetu
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => navigate("/polozeni-ispiti")}
                >
                  <span className="fa fa-th-large"></span> Polozeni ispiti
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => navigate("/prijava-ispita")}
                >
                  <span className="fa fa-sticky-note"></span> Prijava ispita
                </button>
              </li>
            </>
          )}
          <li>
            <button type="button" className="nav-btn" onClick={logOut}>
              <span className="fa fa-power-off"></span> Izloguj me
            </button>
          </li>
        </ul>
        <div className="footer">
          <p>
            Copyright &copy;{new Date().getFullYear()}
            All rights reserved | Colorlib.com
          </p>
        </div>
      </nav>
      {/* Main Content */}
      <div id="content" className="p-4 p-md-5 content">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
              onClick={() => setSideBarCollapsed((c) => !c)}
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
              onClick={() => setHeaderBarCollapsed((c) => !c)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <div
              className={`collapse navbar-collapse ${
                headerBarCollapsed ? "" : "show"
              }`}
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto header">
                <li className="nav-item">
                  <span className="fa fa-user"></span> {user?.name}
                </li>
                <li className="nav-item" onClick={logOut}>
                  Izloguj me <span className="fa fa-power-off izlogujMe"></span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Route-dependent content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
