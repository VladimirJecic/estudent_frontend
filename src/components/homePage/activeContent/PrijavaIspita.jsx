import PrijavaIspitaViewModel from "../../../viewModel/PrijavaIspitaViewModel.js";
import SuccessWindow from "../../login/SuccessWindow.jsx";
import { useMemo, useState, useEffect } from "react";
import { dateTimeToString } from "../../../utils/DateUtility.js";
import "../../../assets/componentCSS/PrijavaIspita.css";

const PrijavaIspita = () => {
  const viewModel = useMemo(() => new PrijavaIspitaViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.ucitajPotencijalnePrijave();
    viewModel.ucitajPostojecePrijave();
  }, [viewModel, viewModelState]);
  return (
    <div className="prijavaIspita">
      <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
      {viewModelState.potencijalnePrijave.length === 0 ? (
        <p> {viewModel.vratiPorukuPotencijalnePrijave()}</p>
      ) : (
        <div className="tableWrapper prijavaIspita">
          {viewModelState.successMessage && (
            <SuccessWindow
              title="Prijava ispita"
              successMessage={viewModelState.successMessage}
              hideWindow={viewModel.hideWindow}
            />
          )}
          <table>
            <thead>
              <tr>
                <th>Naziv Ispita</th>
                <th>Espb</th>
                <th>Vreme polaganja</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.potencijalnePrijave.map((polaganje, key) => (
                <tr key={key}>
                  <td>{polaganje.courseExam.course.name}</td>
                  <td>{polaganje.courseExam.course.espb}</td>
                  <td>{dateTimeToString(polaganje.courseExam.examDateTime)}</td>
                  <td>
                    <button
                      onClick={() => viewModel.sacuvajPrijavu(key)}
                      className="tableButton"
                    >
                      prijavi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="mb-4 prijavljeniIspitiTitle">Prijavljeni ispiti</h2>
      {viewModelState.postojecePrijave.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5> {viewModel.vratiPorukuPostojecePrijave()}</h5>
        </div>
      ) : (
        <div className="tableWrapper prijavaIspita">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Naziv Ispita</th>
                <th rowSpan={1}>Espb</th>
                <th rowSpan={3}>Vreme polaganja</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.polozeniIspiti.map((polaganje, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{polaganje.courseExam.course.name}</td>
                  <td>{polaganje.mark}</td>
                  <td>{polaganje.courseExam.course.espb}</td>
                  <td>{dateTimeToString(polaganje.courseExam)}</td>
                  <td>{polaganje.signed_by.name}</td>
                  <td>{polaganje.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default PrijavaIspita;
