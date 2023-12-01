import React, { useEffect } from "react";
import "../../../assets/componentCSS/AktuelniRokovi.css";
import aktuelniRokoviViewModel from "../../../viewModel/AktuelniRokoviViewModel.js";
import { dateToString } from "../../../utils/DateUtility.js";
const AktuelniRokovi = ({ refAktuelniRokovi }) => {
  const viewModel = aktuelniRokoviViewModel(refAktuelniRokovi);
  useEffect(() => {
    if (!refAktuelniRokovi.current) {
      (async () => {
        const r = await viewModel.ucitajAktuelneRokove();
        refAktuelniRokovi.current = r;
      })();
    } else {
      viewModel.setAktuelniRokovi(refAktuelniRokovi.current);
    }
  }, []);
  function prikaziMojeIspite() {}
  function prikaziSveIspite() {}
  return (
    <div>
      <p>Aktuelni Rokovi</p>
      {viewModel.aktuelniRokovi.length === 0 ? (
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
              {viewModel.aktuelniRokovi.map((rok, key) => (
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
      {viewModel.aktuelniRokovi.length !== 0 ? (
        <p></p>
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
              {viewModel.aktuelniRokovi.map((rok, key) => (
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

export default React.memo(AktuelniRokovi);
