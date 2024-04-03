import AktuelniRokovi from "./AktuelniRokovi.jsx";
import { Routes, Route } from "react-router-dom";
import PolozeniIspiti from "./PolozeniIspiti.jsx";
import PrijavaIspita from "./PrijavaIspita.jsx";
import LoginViewModel from "../../../viewModel/LoginViewModel.js";
import UpisOcena from "./UpisOcena.jsx";

const ActiveContent = () => {
  return (
    <Routes>
      {LoginViewModel.getStoredUser()?.isAdmin() ? (
        <Route path="upis_ocena" element={<UpisOcena />} />
      ) : (
        <>
          <Route path="polozeni_ispiti" element={<PolozeniIspiti />} />
          <Route path="prijava_ispita" element={<PrijavaIspita />} />
        </>
      )}
      <Route path="rokovi" element={<AktuelniRokovi />} />
    </Routes>
  );
};

export default ActiveContent;
