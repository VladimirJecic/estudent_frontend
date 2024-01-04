import Header from "../Header.jsx";
import AktuelniRokovi from "./AktuelniRokovi.jsx";
import { Routes, Route } from "react-router-dom";
import PolozeniIspiti from "./PolozeniIspiti.jsx";
import PrijavaIspita from "./PrijavaIspita.jsx";
// import useActiveContentViewModel from "../../../viewModel/ActiveContentViewModel.js";

const ActiveContent = ({ handleSBCollapsing, signUp, logOut, user }) => {
  return (
    <div id="content" className="p-4 p-md-5 content">
      <Header
        handleSBCollapsing={handleSBCollapsing}
        logOut={logOut}
        user={user}
        signUp={signUp}
      />
      <Routes>
        <Route path="rokovi" element={<AktuelniRokovi />} />
        <Route path="polozeni_ispiti" element={<PolozeniIspiti />} />
        <Route path="prijava_ispita" element={<PrijavaIspita />} />
      </Routes>
    </div>
  );
};

export default ActiveContent;
