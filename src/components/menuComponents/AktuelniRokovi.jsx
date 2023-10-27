import "../assets/componentCSS/AktuelniRokovi.css";
function AktuelniRokovi({ rokovi }) {
  return (
    <div>
      <p>Aktuelni Rokovi</p>
      <hr></hr>
      <div className="tableWrapper">
        <table>
          <tr>
            <th rowSpan={2}>Rok</th>
            <th colSpan={2}>Prijava</th>
            <th colSpan={2}>Trajanje</th>
            <th rowSpan>Gender</th>
            <th rowSpan>Gender</th>
          </tr>
          <tr>
            <th>pocetak</th>
            <th>kraj</th>
            <th>pocetak</th>
            <th>kraj</th>
          </tr>
          {rokovi.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.rok}</td>
                <td>{val.prijavaOd}</td>
                <td>{val.prijavaDo}</td>
                <td>{val.trajanjeOd}</td>
                <td>{val.trajanjeDo}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MainContent;
