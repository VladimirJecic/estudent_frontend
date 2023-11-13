import Header from "../Header.jsx";
import AktuelniRokovi from "./AktuelniRokovi.jsx";
import useAktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import usePolozeniIspitiViewModel from "../../../viewModel/PolozeniIspitiViewModel.js";
import usePrijavaIspitaViewModel from "../../../viewModel/PrijavaIspitaViewModel.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import PolozeniIspiti from "./PolozeniIspiti.jsx";
import PrijavaIspita from "./PrijavaIspita.jsx";

function ActiveContent({ handleSBCollapsing, prepareActiveContentNavigation }) {
  prepareActiveContentNavigation(useNavigate());
  const aktuelniRokoviViewModel = useAktuelniRokoviViewModel();
  const polozeniIspitiViewModel = usePolozeniIspitiViewModel();
  const prijavaIspitaViewModel = usePrijavaIspitaViewModel();

  return (
    <div id="content" className="p-4 p-md-5 content">
      <Header handleSBCollapsing={handleSBCollapsing} />
      <Routes>
        <Route
          path="/rokovi"
          element={
            <AktuelniRokovi
              aktuelniRokovi={aktuelniRokoviViewModel.aktuelniRokovi}
              ucitajAktuelneRokove={
                aktuelniRokoviViewModel.ucitajAktuelneRokove
              }
            />
          }
        />
        <Route
          path="/polozeni_ispiti"
          element={
            <PolozeniIspiti polozeniIspitiViewModel={polozeniIspitiViewModel} />
          }
        />
        <Route
          path="/prijava_ispita"
          element={
            <PrijavaIspita prijavaIspitaViewModel={prijavaIspitaViewModel} />
          }
        />
      </Routes>
    </div>
  );
}

export default ActiveContent;
