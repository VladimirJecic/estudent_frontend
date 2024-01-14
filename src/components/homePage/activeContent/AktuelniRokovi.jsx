import "../../../assets/componentCSS/AktuelniRokovi.css";
import AktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import { dateToString, dateTimeToString } from "../../../utils/DateUtility.js";
import { useEffect, useState, useMemo } from "react";
const AktuelniRokovi = () => {
  const viewModel = useMemo(() => new AktuelniRokoviViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.ucitajAktuelneRokove();
  }, [viewModel]);
  return (
    <div>
      <p>Ispiti</p>
      {viewModelState.aktuelniRokovi.length === 0 ? (
        <p> Nema trenutno aktuelnih rokova</p>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Rok</th>
                <th colSpan={2}>Prijava</th>
                <th colSpan={2}>Trajanje</th>
                <th rowSpan={2} colSpan={2}>
                  Ispiti
                </th>
              </tr>
              <tr>
                <th>pocetak</th>
                <th>kraj</th>
                <th>pocetak</th>
                <th>kraj</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.aktuelniRokovi.map((rok, key) => (
                <tr key={key}>
                  <td>{rok.name}</td>
                  <td>{dateToString(rok.dateRegistrationStart)}</td>
                  <td>{dateToString(rok.dateRegistrationEnd)}</td>
                  <td>{dateToString(rok.dateStart)}</td>
                  <td>{dateToString(rok.dateEnd)}</td>
                  <td>
                    <button
                      onClick={() => viewModel.ucitajMojeIspite(key)}
                      className="tableButton"
                    >
                      moji
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => viewModel.ucitajSveIspite(key)}
                      className="tableButton"
                    >
                      svi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {viewModelState.sviIspiti && (
        <div className="tableWrapper">
          <p>Svi Ispiti za {viewModelState.imeTrazenogRoka}</p>
          <table>
            <thead>
              <tr>
                <th>Predmet</th>
                <th>Semestar</th>
                <th>Espb</th>
                <th>Vreme Polaganja</th>
                <th>Sala</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.sviIspiti.map((courseExam, key) => (
                <tr key={key}>
                  <td>{courseExam.course.name}</td>
                  <td>{courseExam.course.semester}</td>
                  <td>{courseExam.course.espb}</td>
                  <td>{dateTimeToString(courseExam.examDateTime)}</td>
                  <td>{courseExam.hall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AktuelniRokovi;
