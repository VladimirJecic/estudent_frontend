import React from "react";

function Sidebar({ sBarCollapsed, handleSBItemChange }) {
  return (
    <nav id="sidebar" className={`${sBarCollapsed ? "active" : ""}`}>
      <h1>
        <a href="index.html" className="logo">
          M.
        </a>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active" onClick={() => handleSBItemChange("home")}>
          <a href="#">
            <span className="fa fa-home"></span> Home
          </a>
        </li>
        <li onClick={() => handleSBItemChange("about")}>
          <a href="#">
            <span className="fa fa-th-large"></span> About
          </a>
        </li>
        <li onClick={() => handleSBItemChange("blog")}>
          <a href="#">
            <span className="fa fa-sticky-note"></span> Blog
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-cogs"></span> Services
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa fa-paper-plane"></span> Contacts
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
