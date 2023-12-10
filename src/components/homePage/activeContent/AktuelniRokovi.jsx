import "../../../assets/componentCSS/AktuelniRokovi.css";
import AktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import { dateToString } from "../../../utils/DateUtility.js";
import { useEffect, useState } from "react";
const AktuelniRokovi = () => {
  const [aktuelniRokoviVM, setAktuelniRokoviVM] = useState(
    new AktuelniRokoviViewModel()
  );
  aktuelniRokoviVM.updateView = () => {
    setAktuelniRokoviVM(aktuelniRokoviVM.copy());
  };
  useEffect(() => {
    aktuelniRokoviVM.ucitajAktuelneRokove();
  }, []);
  return (
    <div>
      <p>Aktuelni Rokovi</p>
      {aktuelniRokoviVM.aktuelniRokovi.length === 0 ? (
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
              {aktuelniRokoviVM.aktuelniRokovi.map((rok, key) => (
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
      {aktuelniRokoviVM.aktuelniRokovi.length !== 0 ? null : (
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
              {aktuelniRokoviVM.aktuelniRokovi.map((rok, key) => (
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
