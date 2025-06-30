import "../../../assets/componentCSS/AktuelniRokovi.css";
import AktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import { dateToString, dateTimeToString } from "../../../utils/DateUtility.js";
import { useEffect, useState, useMemo } from "react";
import LoginViewModel from "../../../viewModel/LoginViewModel.js";
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
    <div className="aktuelniRokovi">
      <h2 className="mb-4">Rokovi</h2>
      {viewModelState.aktuelniRokovi.length === 0 ? (
        <div className="bg-info w-50 text-center mx-auto">
          <h5 className="mr-9"> {viewModel.vratiPoruku()}</h5>
        </div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Rok</th>
                <th colSpan={2}>Prijava</th>
                <th colSpan={2}>Trajanje</th>
                <th
                  rowSpan={2}
                  colSpan={LoginViewModel.getStoredUser()?.isAdmin() ? 1 : 2}
                >
                  Ispiti
                </th>
              </tr>
              <tr>
                <th>početak</th>
                <th>kraj</th>
                <th>početak</th>
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
                  {!LoginViewModel.getStoredUser()?.isAdmin() && (
                    <td>
                      <button
                        onClick={() => viewModel.ucitajMojeIspite(key)}
                        className="tableButton"
                      >
                        moji
                      </button>
                    </td>
                  )}
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
      {viewModelState.sviIspiti.length === 0 ? (
        <></>
      ) : (
        <div className="tableWrapper">
          <h5 className="mb-3 mt-4">
            Svi Ispiti za {viewModelState.imeTrazenogRoka}
          </h5>
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
      {viewModelState.mojiIspiti.length === 0 ? (
        <></>
      ) : (
        <div className="tableWrapper">
          <h5 className="mb-3 mt-4">
            Moji Ispiti za {viewModelState.imeTrazenogRoka}
          </h5>

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
              {viewModelState.mojiIspiti.map((courseExam, key) => (
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
