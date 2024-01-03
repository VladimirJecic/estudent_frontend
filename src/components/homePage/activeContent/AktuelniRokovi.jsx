import "../../../assets/componentCSS/AktuelniRokovi.css";
import AktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import { dateToString } from "../../../utils/DateUtility.js";
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
      <p>Aktuelni Rokovi</p>
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
      {viewModelState.aktuelniRokovi.length !== 0 ? null : (
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
                    <button className="tableButton">moji</button>
                  </td>
                  <td>
                    <button className="tableButton">svi</button>
                  </td>
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
