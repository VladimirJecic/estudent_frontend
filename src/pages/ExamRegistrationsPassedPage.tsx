/* eslint-disable react-hooks/exhaustive-deps */
import ExamRegistrationsPassedViewModel from "@/viewModel/ExamRegistrationsPassedViewModel";
import { useMemo, useState, useEffect } from "react";
import { useAlertService } from "@/context/AlertServiceContext";
const ExamRegistrationsPassedPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(
    () => new ExamRegistrationsPassedViewModel(alertService),
    []
  );
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.fetchExamRegistrationsPassed();
  }, [viewModel]);
  return (
    <div className="polozeniIspiti text-center d-flex flex-column align-items-center">
      <h2 className="mb-4">Rokovi</h2>
      {viewModelState.isLoadingExamRegistrationsPassed ? (
        <div className="bg-info w-50 text-center ">
          <h5> {"učitava se..."}</h5>
        </div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan={1}>R.Br</th>
                <th rowSpan={2}>Naziv Ispita</th>
                <th rowSpan={1}>Ocena</th>
                <th rowSpan={1}>Espb</th>
                <th rowSpan={3}>Datum polaganja</th>
                <th rowSpan={2}>Potpisao nastavnik</th>
                <th rowSpan={2}>Dodatne informacije</th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.examRegistrationsPassed.map((erp, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{erp.courseName}</td>
                  <td>{erp.mark}</td>
                  <td>{erp.courseEspb}</td>
                  <td>{erp.updatedAtFormatted}</td>
                  <td>{erp.signedByName}</td>
                  <td>{erp.comment}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-start font-weight-bold" colSpan={7}>
                  Prosečna ocena: {viewModelState.averageMark}, Ukupno ostvareno
                  ESPB poena: {viewModelState.totalESPB}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
export default ExamRegistrationsPassedPage;
