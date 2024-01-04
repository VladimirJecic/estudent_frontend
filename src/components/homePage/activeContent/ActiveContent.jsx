import AktuelniRokovi from "./AktuelniRokovi.jsx";
import { Routes, Route } from "react-router-dom";
import PolozeniIspiti from "./PolozeniIspiti.jsx";
import PrijavaIspita from "./PrijavaIspita.jsx";
// import useActiveContentViewModel from "../../../viewModel/ActiveContentViewModel.js";

const ActiveContent = () => {
  return (
    <Routes>
      <Route path="rokovi" element={<AktuelniRokovi />} />
      <Route path="polozeni_ispiti" element={<PolozeniIspiti />} />
      <Route path="prijava_ispita" element={<PrijavaIspita />} />
    </Routes>
  );
};

export default ActiveContent;
