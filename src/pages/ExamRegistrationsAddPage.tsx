/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import ExamRegistrationsAddViewModel from "@/viewModel/ExamRegistrationsAddViewModel";
import { useAlertService } from "@/context/AlertServiceContext";

const ExamRegistrationsAddPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(
    () => new ExamRegistrationsAddViewModel(alertService),
    []
  );
  const [viewModelState, setViewModelState] = useState(viewModel.project());

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.setupView();
  }, [viewModel]);
  return (
    <div className="prijavaIspita">
      <h2 className="mb-4">Ispiti koje mogu da prijavim</h2>
      {viewModelState.isLoadingExamRegistrationCandidates ? (
        <div className="bg-info w-50 text-center ">
          <h5> učitava se...</h5>
        </div>
      ) : viewModelState.courseExamRegistrationCandidates.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5> Prijava ispita nije u toku</h5>
        </div>
      ) : (
        <div className="tableWrapper prijavaIspita">
          <table>
            <thead>
              <tr>
                <th>Naziv Ispita</th>
                <th>Espb</th>
                <th>Vreme polaganja</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.courseExamRegistrationCandidates.map(
                (courseExamRegistrationCandidate, key) => (
                  <tr key={key}>
                    <td>{courseExamRegistrationCandidate.courseName}</td>
                    <td>{courseExamRegistrationCandidate.courseEspb}</td>
                    <td>
                      {courseExamRegistrationCandidate.examDateTimeFormatted}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          viewModel.saveExamRegistration(
                            courseExamRegistrationCandidate
                          )
                        }
                        className="tableButton"
                      >
                        prijavi
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="mb-4 prijavljeniIspitiTitle">Prijavljeni ispiti</h2>
      {viewModelState.isLoadingExamRegistrationsExisting ? (
        <div className="bg-info w-50 text-center ">
          <h5> učitava se...</h5>
        </div>
      ) : viewModelState.examRegistrationsExisting.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5> Nema prijavljenih ispita</h5>
        </div>
      ) : (
        <div className="tableWrapper prijavaIspita">
          <table>
            <thead>
              <tr>
                <th>Naziv Ispita</th>
                <th>Espb</th>
                <th>Vreme polaganja</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {viewModelState.examRegistrationsExisting.map(
                (examRegistration, key) => (
                  <tr key={key}>
                    <td>{examRegistration.courseName}</td>
                    <td>{examRegistration.courseEspb}</td>
                    <td>{examRegistration.examDateTimeFormatted}</td>
                    {examRegistration.courseExam.examPeriod
                      .dateRegistrationEnd > new Date() ? (
                      <td>
                        <button
                          onClick={() =>
                            viewModel.deleteExamRegistration(examRegistration)
                          }
                          className="tableButton"
                        >
                          odjavi
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ExamRegistrationsAddPage;
