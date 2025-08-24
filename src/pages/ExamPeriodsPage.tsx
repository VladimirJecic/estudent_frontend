/* eslint-disable react-hooks/exhaustive-deps */
import ExamPeriodsViewModel from "@/viewModel/ExamPeriodsViewModel";
import { useUser } from "@/context/UserContext";
import { useEffect, useState, useMemo } from "react";
import { useAlertService } from "@/context/AlertServiceContext";
const ExamPeriodsPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(() => new ExamPeriodsViewModel(alertService), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  const { user } = useUser();
  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };
  useEffect(() => {
    viewModel.fetchActiveExamPeriods();
  }, [viewModel]);
  return (
    <div className="aktuelniRokovi">
      <h2 className="mb-4">Rokovi</h2>
      {viewModelState.examPeriods.length === 0 &&
      viewModelState.isLoadingExamPeriods === true ? (
        <div className="bg-info w-50 text-center ">
          <h5> {"učitava se..."}</h5>
        </div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Rok</th>
                <th colSpan={2}>Prijava</th>
                <th colSpan={2}>Trajanje</th>
                <th rowSpan={2} colSpan={user?.isAdmin ? 1 : 2}>
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
              {viewModelState.examPeriods.map((rok, key) => (
                <tr key={key}>
                  <td>{rok.name}</td>
                  <td>{rok.dateRegistrationStartFormatted}</td>
                  <td>{rok.dateRegistrationEndFormatted}</td>
                  <td>{rok.dateStartFormatted}</td>
                  <td>{rok.dateEndFormatted}</td>
                  {!user?.isAdmin && (
                    <td>
                      <button
                        onClick={() => viewModel.showRemainingCourseExams(rok)}
                        className="tableButton"
                      >
                        moji
                      </button>
                    </td>
                  )}
                  <td>
                    <button
                      onClick={() => viewModel.showAllCourseExams(rok)}
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
      {viewModelState.isAllCourseExamsVisible ? (
        <></>
      ) : (
        <div className="tableWrapper">
          <h5 className="mb-3 mt-4">
            Svi Ispiti za {viewModelState.selectedExamName}
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
              {viewModelState.allCourseExams.map((courseExam, key) => (
                <tr key={key}>
                  <td>{courseExam.courseName}</td>
                  <td>{courseExam.courseSemester}</td>
                  <td>{courseExam.courseEspb}</td>
                  <td>{courseExam.examDateTimeFormatted}</td>
                  <td>{courseExam.hall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!viewModelState.isRemainingCourseExamsVisible ? (
        <></>
      ) : (
        <div className="tableWrapper">
          <h5 className="mb-3 mt-4">
            Moji Ispiti za {viewModelState.selectedExamName}
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
              {viewModelState.remainingCourseExams.map((courseExam, key) => (
                <tr key={key}>
                  <td>{courseExam.courseName}</td>
                  <td>{courseExam.courseSemester}</td>
                  <td>{courseExam.courseEspb}</td>
                  <td>{courseExam.examDateTimeFormatted}</td>
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

export default ExamPeriodsPage;
