import { useState } from "react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoFon from "@/assets/logo-fon.png";
import {
  NavigationDrawer,
  List,
  ListItem,
} from "@/components/custom/NavigationDrawer";
import { useUser } from "@/context/UserContext";

export const AppLayout = () => {
  const navigate = useNavigate();
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
  const { user, isAdmin, isStudent, logOut } = useUser();

  return (
    <>
      <div className="wrapper align-items-stretch w-100">
        {/* Sidebar */}
        <NavigationDrawer
          expandOnHover
          expanded={sideBarExpanded}
          onExpandedChange={setSideBarExpanded}
        >
          <div className="d-flex column mt-3 mb-2 align-items-center">
            <img
              src={logoFon}
              alt="Logo"
              className={`${sideBarExpanded ? "circularLogo" : "squareLogo"}`}
            />
          </div>
          <List>
            <ListItem
              prependIcon="far fa-calendar-check"
              title="Aktuelni rokovi"
              onClick={() => navigate("/")}
            />
            {isStudent && (
              <>
                <ListItem
                  prependIcon="fa fa-th-large"
                  title="Položeni ispiti"
                  onClick={() => navigate("/passed-exams")}
                />
                <ListItem
                  prependIcon="fa fa-sticky-note"
                  title="Prijava ispita"
                  onClick={() => navigate("/exam-registration")}
                />
              </>
            )}
            {isAdmin && (
              <>
                <ListItem
                  prependIcon="fa-solid fa-chart-simple"
                  title="Izveštaj predmeta"
                  onClick={() => navigate("/course-report")}
                />
                <ListItem
                  prependIcon="fa-solid fa-file-lines"
                  title="Izveštaj polaganja ispita"
                  onClick={() => navigate("/exam-report")}
                />
                <ListItem
                  prependIcon="fa-solid fa-pen-to-square"
                  title="Upis ocena"
                  onClick={() => navigate("/grade-entry")}
                />
              </>
            )}
          </List>
        </NavigationDrawer>
        <div
          id="content"
          className={`content p-4 p-md-5 ${sideBarExpanded ? "expanded" : ""}`}
        >
          <div className="d-flex flex-row justify-content-center align-items-center mb-5 header-row">
            <div className="headerDiv flex-grow-1 text-center">
              <span className="h4">
                Studentski servisi - <i>Fakultet organizacionih nauka</i>
              </span>
            </div>
            <ul className="nav header d-flex flex-row align-items-center ms-auto mb-0">
              <li className="nav-item me-3 d-flex align-items-center">
                <span className="fa fa-user secondary-darken-1 me-1"></span>
                <span className=" secondary">{user?.name}</span>
              </li>
              <li
                className="nav-item logout-pointer d-flex align-items-center secondary-darken-1"
                onClick={logOut}
              >
                <span className="me-1">Izloguj me</span>
                <span className="fa fa-power-off"></span>
              </li>
            </ul>
          </div>
          {/* Route-dependent content */}
          <Outlet />
        </div>
      </div>
    </>
  );
};
