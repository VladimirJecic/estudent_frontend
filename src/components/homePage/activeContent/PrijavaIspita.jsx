import { useMemo, useState, useEffect } from "react";
import { dateTimeToString } from "../../../utils/DateUtility.js";
import PrijavaIspitaViewModel from "../../../viewModel/PrijavaIspitaViewModel.js";
import SuccessWindow from "../../login/SuccessWindow.jsx";
import "../../../assets/componentCSS/PrijavaIspita.css";

const PrijavaIspita = () => {
  const viewModel = useMemo(() => new PrijavaIspitaViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.setupView();
  }, [viewModel]);
  return (
    <div className="prijavaIspita">
      <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
      {viewModelState.potencijalnePrijave.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5> {viewModel.vratiPorukuPostojecePrijave()}</h5>
        </div>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.potencijalnePrijave.map(
                (examRegistration, key) => (
                  <tr key={key}>
                    <td>{examRegistration.courseExam.course.name}</td>
                    <td>{examRegistration.courseExam.course.espb}</td>
                    <td>
                      {dateTimeToString(
                        examRegistration.courseExam.examDateTime
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => viewModel.sacuvajPrijavu(key)}
                        className="tableButton"
                      >
                        prijavi
                      </button>
                    </td>
                  </tr>
                )
              )}
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
                <th>Naziv Ispita</th>
                <th>Espb</th>
                <th>Vreme polaganja</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.postojecePrijave.map((examRegistration, key) => (
                <tr key={key}>
                  <td>{examRegistration.courseExam.course.name}</td>
                  <td>{examRegistration.courseExam.course.espb}</td>
                  <td>
                    {dateTimeToString(examRegistration.courseExam.examDateTime)}
                  </td>
                  {examRegistration.courseExam.examPeriod.dateRegistrationEnd >
                  new Date() ? (
                    <td>
                      <button
                        onClick={() => viewModel.obrisiPrijavu(key)}
                        className="tableButton"
                      >
                        odjavi
                      </button>
                    </td>
                  ) : null}
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
