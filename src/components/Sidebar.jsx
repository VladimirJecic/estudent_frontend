/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Image from "react-bootstrap/Image";
import logoFon from "../assets/logo-fon.png";

function Sidebar({ sBarCollapsed, handleSBItemChange }) {
  return (
    <nav id="sidebar" className={`${sBarCollapsed ? "active" : ""}`}>
      <h1>
        <a href="index.html" className="logo">
          <Image src={logoFon} rounded fluid />
        </a>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active" onClick={() => handleSBItemChange("rokovi")}>
          <a>
            <span className="fa fa-home"></span> Aktuelni rokovi
          </a>
        </li>
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
        <li>
          <a>
            <span className="fa fa-power-off"></span> Kraj rada
          </a>
        </li>
      </ul>

      <div className="footer">
        <p>
          Copyright &copy;
          <script>{`document.write(new Date().getFullYear());`}</script>
          All rights reserved | This template is made with
          <i className="icon-heart" aria-hidden="true"></i> by
          <a href="" target="_blank">
            Colorlib.com
          </a>
        </p>
      </div>
    </nav>
  );
}

export default Sidebar;
