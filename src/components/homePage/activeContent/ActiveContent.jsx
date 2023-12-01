import React, { useRef } from "react";
import Header from "../Header.jsx";
import AktuelniRokovi from "./AktuelniRokovi.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import PolozeniIspiti from "./PolozeniIspiti.jsx";
import PrijavaIspita from "./PrijavaIspita.jsx";
import useActiveContentViewModel from "../../../viewModel/ActiveContentViewModel.js";

const ActiveContent = ({ handleSBCollapsing, sBarItem }) => {
  const activeContentViewModel = useActiveContentViewModel(sBarItem);
  activeContentViewModel.prepareNavigation(useNavigate());
  const aktuelniRokovi = useRef();
  console.log("ActiveContent rendered");
  return (
    <div id="content" className="p-4 p-md-5 content">
      <Header handleSBCollapsing={handleSBCollapsing} />
      <Routes>
        <Route
          path="rokovi"
          element={<AktuelniRokovi refAktuelniRokovi={aktuelniRokovi} />}
        />
        <Route path="polozeni_ispiti" element={<PolozeniIspiti />} />
        <Route path="prijava_ispita" element={<PrijavaIspita />} />
      </Routes>
    </div>
  );
};

export default ActiveContent;
