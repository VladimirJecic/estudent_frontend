import PrijavaIspitaViewModel from "../../../viewModel/PrijavaIspitaViewModel.js";
import { useMemo, useState, useEffect } from "react";
import { dateTimeToString } from "../../../utils/DateUtility.js";
import { formatNumberToTwoDecimalPlaces } from "../../../utils/NumberUtility.js";
import "../../../assets/componentCSS/PrijavaIspita.css";

const PrijavaIspita = () => {
  const viewModel = useMemo(() => new PrijavaIspitaViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.ucitajPotencijalnePrijave();
    //viewModel.ucitajPostojecePrijave();
  }, [viewModel]);
  return (
    <div className="prijavaIspita">
      <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
      {viewModelState.potencijalnePrijave.length === 0 ? (
        <p> Prijava ispita nije u toku</p>
      ) : (
        <div className="tableWrapper prijavaIspita">
          <table>
            <thead>
              <tr>
                <th>Naziv Ispita</th>
                <th>Espb</th>
                <th>Vreme polaganja</th>
                <th colSpan={2}>Akcija</th>
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
                      onClick={() => viewModel.ucitajMojeIspite(key)}
                      className="tableButton"
                    >
                      prijavi
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => viewModel.ucitajMojeIspite(key)}
                      className="tableButton"
                    >
                      odjavi
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
          <h5> Niste prijavili nijedan ispit!</h5>
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
            <tfoot>
              <tr>
                <td style={{ textAlign: "left" }} colSpan={7}>
                  Prosečna ocena:{" "}
                  {formatNumberToTwoDecimalPlaces(viewModel.prosecnaOcena())},
                  Ukupno ostvareno ESPB poena: {viewModel.ukupnoESPB()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
export default PrijavaIspita;
