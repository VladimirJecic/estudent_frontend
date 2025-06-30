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
    viewModel.setupView();
  }, [viewModel]);
  return (
    <div className="neocenjenaPolaganja">
      <h2 className="mb-4">Neocenjena polaganja</h2>
      {viewModelState.neocenjenaPolaganja.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5> {viewModel.vratiPoruku()}</h5>
        </div>
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
                <th rowSpan={1}>R.Br</th>
                <th rowSpan={1}>Broj indexa</th>
                <th rowSpan={2}>Naziv Ispita</th>
                <th rowSpan={2}>Ime</th>
                <th rowSpan={1}>Ocena</th>
                <th rowSpan={3}>Poslednji datum izmene</th>
                <th rowSpan={2}>Dodatne informacije</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.neocenjenaPolaganja.map((prijava, key) => (
                <tr key={key}>
                  <td>
                    <p>{key + 1}</p>
                  </td>
                  <td>
                    <p>{prijava.student.indexNum}</p>
                  </td>
                  <td>
                    <p>{prijava.courseExam.course.name}</p>
                  </td>
                  <td className="w-25">
                    <p>{prijava.student.name}</p>
                  </td>
                  <td>
                    <input
                      className="form-control text-center"
                      type="text"
                      name="mark"
                      value={prijava.mark}
                      onChange={(e) => {
                        viewModel.changePolaganje(e, key);
                      }}
                    />
                  </td>
                  <td>{dateToString(prijava.updated_at)}</td>
                  <td td className="w-25">
                    <textarea
                      className="form-control"
                      type="text"
                      name="comment"
                      placeholder=""
                      value={prijava.comment}
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
