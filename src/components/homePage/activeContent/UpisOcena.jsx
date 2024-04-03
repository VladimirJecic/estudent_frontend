import { useMemo, useState, useEffect } from "react";
import { dateToString } from "../../../utils/DateUtility.js";
import UpisOcenaViewModel from "../../../viewModel/UpisOcenaViewModel.js";
import SuccessWindow from "../../login/SuccessWindow.jsx";
import "../../../assets/componentCSS/UpisOcena.css";
const UpisOcena = () => {
  const viewModel = useMemo(() => new UpisOcenaViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.ucitajNeocenjenaPolaganja();
  }, [viewModel]);
  return (
    <div className="neocenjenaPolaganja">
      <h2 className="mb-4">Neocenjena polaganja</h2>
      {viewModelState.neocenjenaPolaganja.length === 0 ? (
        <p>{viewModel.vratiPoruku()}</p>
      ) : (
        <div className="tableWrapper">
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
                <th rowSpan={1}>Broj indexa</th>
                <th rowSpan={2}>Ime</th>
                <th rowSpan={1}>Ocena</th>
                <th rowSpan={3}>Poslednji datum izmene</th>
                <th rowSpan={2}>Potpisao nastavnik</th>
                <th rowSpan={2}>Dodatne informacije</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.neocenjenaPolaganja.map((polaganje, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{polaganje.student.indexNum}</td>
                  <td>{polaganje.student.name}</td>
                  <td>
                    <input
                      type="text"
                      name="mark"
                      placeholder={polaganje.mark}
                      onChange={(e) => {
                        viewModel.changePolaganje(e, key);
                      }}
                    />
                  </td>
                  <td>{dateToString(polaganje.updated_at)}</td>
                  <td>{polaganje.signed_by.name}</td>
                  <td>
                    <input
                      type="text"
                      name="comment"
                      placeholder={polaganje.comment}
                      onChange={(e) => {
                        viewModel.changePolaganje(e, key);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => viewModel.sacuvajPrijavu(key)}
                      className="tableButton"
                    >
                      sačuvaj izmene
                    </button>
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
export default UpisOcena;
