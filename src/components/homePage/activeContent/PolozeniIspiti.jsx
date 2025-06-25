import PolozeniIspitiViewModel from "../../../viewModel/PolozeniIspitiViewModel.js";
import { useMemo, useState, useEffect } from "react";
import { dateToString } from "../../../utils/DateUtility.js";
import { formatNumberToTwoDecimalPlaces } from "../../../utils/NumberUtility.js";
import "../../../assets/componentCSS/PolozeniIspiti.css";
const PolozeniIspiti = () => {
  const viewModel = useMemo(() => new PolozeniIspitiViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.ucitajPolozeneIspite();
  }, [viewModel]);
  return (
    <div className="polozeniIspiti text-center d-flex flex-column align-items-center">
      <h2 className="mb-4">Položeni ispiti</h2>
      {viewModelState.polozeniIspiti.length === 0 ? (
        <div className="bg-info w-50 text-center mx-auto">
          <h5> {viewModel.vratiPoruku()}</h5>
        </div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan={1}>R.Br</th>
                <th rowSpan={2}>Naziv Ispita</th>
                <th rowSpan={1}>Ocena</th>
                <th rowSpan={1}>Espb</th>
                <th rowSpan={3}>Datum polaganja</th>
                <th rowSpan={2}>Potpisao nastavnik</th>
                <th rowSpan={2}>Dodatne informacije</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.polozeniIspiti.map((polaganje, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{polaganje.courseExam.course.name}</td>
                  <td>{polaganje.mark}</td>
                  <td>{polaganje.courseExam.course.espb}</td>
                  <td>{dateToString(polaganje.updated_at)}</td>
                  <td>{polaganje.signed_by.name}</td>
                  <td>{polaganje.comment}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-start font-weight-bold" colSpan={7}>
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
export default PolozeniIspiti;
