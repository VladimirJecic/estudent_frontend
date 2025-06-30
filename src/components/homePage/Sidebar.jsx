/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Image from "react-bootstrap/Image";
import logoFon from "../../assets/logo-fon.png";
import LoginViewModel from "../../viewModel/LoginViewModel";

function Sidebar({ sBarCollapsed, handleSBItemChange, logOut }) {
  return (
    <nav id="sidebar" className={`${sBarCollapsed ? "active" : ""}`}>
      <h1>
        <a className="logo">
          <Image
            src={logoFon}
            {...(sBarCollapsed ? { rounded: true } : { roundedCircle: true })}
            fluid
          />
        </a>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active" onClick={() => handleSBItemChange("rokovi")}>
          <a>
            <span className="far fa-calendar-check" aria-hidden="true"></span>{" "}
            Aktuelni rokovi
          </a>
        </li>{" "}
        {LoginViewModel.getStoredUser()?.isAdmin() ? (
          <li onClick={() => handleSBItemChange("upis_ocena")}>
            <a>
              <span className="fa-solid fa-pen-to-square"></span> Upis ocena
            </a>
          </li>
        ) : (
          <>
            <li onClick={() => handleSBItemChange("polozeni_ispiti")}>
              <a>
                <span className="fa fa-th-large"></span> Polozeni ispiti
              </a>
            </li>
            <li onClick={() => handleSBItemChange("prijava_ispita")}>
              <a>
                <span className="fa fa-sticky-note"></span> Prijava ispita
              </a>
            </li>
            <li onClick={() => handleSBItemChange("izvestaj_polaganja")}>
              <a>
                <span className="fa-solid fa-file-lines"></span> Izveštaj
                polaganja ispita
              </a>
            </li>

            <li onClick={() => handleSBItemChange("izvestaj_predmeta")}>
              <a>
                <span className="fa-solid fa-chart-simple"></span> Izveštaj o
                predmetu
              </a>
            </li>
          </>
        )}
        <li onClick={() => logOut()}>
          <a>
            <span className="fa fa-power-off"></span> Izloguj me
          </a>
        </li>
      </ul>

      <div className="footer">
        <p>
          Copyright &copy;
          <script>{`document.write(new Date().getFullYear());`}</script>
          All rights reserved | Colorlib.com
        </p>
      </div>
    </nav>
  );
}

export default Sidebar;
