import { useMemo, useState, useEffect } from "react";
import ExamRegistrationGradingViewModel from "@/viewModel/ExamRegistrationGradingViewModel";
import AlertBar from "@/components/AlertBar";
import { ExamRegistrationPresentation } from "@/types/items";

const ExamRegistrationGrading = () => {
  const viewModel = useMemo(() => new ExamRegistrationGradingViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  const [examRegistrationsToGradeCopy, setExamRegistrationsToGradeCopy] =
    useState<ExamRegistrationPresentation[]>([]);

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  useEffect(() => {
    viewModel.setupView();
  }, [viewModel]);

  useEffect(() => {
    setExamRegistrationsToGradeCopy([
      ...viewModelState.examRegistrationsToGrade,
    ]);
  }, [viewModelState.examRegistrationsToGrade]);

  const handleFieldChange = (updated: ExamRegistrationPresentation) => {
    const newState = examRegistrationsToGradeCopy.map((reg) =>
      reg.id === updated.id ? updated : reg
    );
    setExamRegistrationsToGradeCopy(newState);
  };

  return (
    <div className="neocenjenaPolaganja">
      <AlertBar />
      <h2 className="mb-4">Neocenjena polaganja</h2>
      {!viewModelState.isExamRegistrationsLoaded ? (
        <div className="bg-info w-50 text-center ">
          <h5>Učitava se...</h5>
        </div>
      ) : examRegistrationsToGradeCopy.length === 0 ? (
        <div className="bg-info w-50 text-center ">
          <h5>Nema neocenjenih polaganja</h5>
        </div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>R.Br</th>
                <th>Broj indexa</th>
                <th>Naziv Ispita</th>
                <th>Ime</th>
                <th>Ocena</th>
                <th>Prisustvovao</th>
                <th>Poslednji datum izmene</th>
                <th>Dodatne informacije</th>
                <th>Akcija</th>
              </tr>
            </thead>
            <tbody>
              {examRegistrationsToGradeCopy.map((registration, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{registration.studentIndexNum}</td>
                  <td>{registration.courseName}</td>
                  <td>{registration.studentName}</td>
                  <td>
                    <input
                      aria-label="Ocena"
                      className="form-control text-center"
                      type="number"
                      name="mark"
                      value={registration.mark ?? ""}
                      onChange={(e) =>
                        handleFieldChange({
                          ...registration,
                          mark: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      aria-label="Prisustvovao"
                      type="checkbox"
                      name="hasAttended"
                      checked={registration.hasAttended ?? true}
                      onChange={(e) =>
                        handleFieldChange({
                          ...registration,
                          hasAttended: e.target.checked,
                        })
                      }
                    />
                  </td>
                  <td>{registration.updatedAtFormatted}</td>
                  <td className="w-25">
                    <textarea
                      aria-label="Komentar"
                      className="form-control"
                      name="comment"
                      value={registration.comment ?? ""}
                      onChange={(e) =>
                        handleFieldChange({
                          ...registration,
                          comment: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        viewModel.saveExamRegistrationUpdate(registration)
                      }
                      className="tableButton"
                    >
                      Sačuvaj izmene
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

export default ExamRegistrationGrading;
