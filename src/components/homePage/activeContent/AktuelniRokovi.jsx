import { useEffect } from "react";
import "../../../assets/componentCSS/AktuelniRokovi.css";
import { dateToString } from "../../../utils/DateUtility.js";
const AktuelniRokovi = ({ aktuelniRokovi, ucitajAktuelneRokove }) => {
  useEffect(() => {
    ucitajAktuelneRokove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Aktuelni Rokovi</p>
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
            {aktuelniRokovi.map((rok, key) => (
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
    </div>
  );
};

export default AktuelniRokovi;
