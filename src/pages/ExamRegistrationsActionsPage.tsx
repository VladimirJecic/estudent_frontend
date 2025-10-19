/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import ExamRegistrationsActionsViewModel from "@/viewModel/ExamRegistrationsActionsViewModel";
import Button from "@/components/custom/Button";
import Table from "@/components/custom/Table";
import Info from "@/components/custom/Info";
import Title from "@/components/custom/Title";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";

const ExamRegistrationsActionsPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(
    () => new ExamRegistrationsActionsViewModel(alertService),
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
    <Container>
      <Title>Ispiti koje mogu da prijavim</Title>

      {/* First conditional block: exam registration candidates */}
      {viewModelState.isLoadingExamRegistrationCandidates ? (
        <Info className="w-50">učitava se...</Info>
      ) : !viewModelState.canSubmitAnyExamRegistration ? (
        <Info className="w-50">Nema ispita za prijavu</Info>
      ) : (
        <Table
          width="50vw"
          headers={[
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Espb", value: "courseEspb" },
            { title: "Vreme polaganja", value: "examDateTimeFormatted" },
            { title: "Prijavi", value: "actions" },
          ]}
          colWidths={[2, 1, 2, 1]}
          items={viewModelState.courseExamRegistrationCandidates}
          templates={{
            actions: (courseExamRegistrationCandidate) => (
              <Button
                onClick={() =>
                  viewModel.saveExamRegistration(
                    courseExamRegistrationCandidate
                  )
                }
                disabled={
                  !courseExamRegistrationCandidate.isRegistrationInProgress
                }
                tooltip={
                  !courseExamRegistrationCandidate.isRegistrationInProgress
                    ? "Period za prijavu je istekao"
                    : undefined
                }
                icon="fa fa-plus"
              />
            ),
          }}
        />
      )}

      <Title className="text-decoration-underline fs-2 mt-4 mb-2">
        Prijavljeni ispiti
      </Title>

      {/* Second conditional block: existing exam registrations */}
      {viewModelState.isLoadingExamRegistrationsExisting ? (
        <Info className="w-50">učitava se...</Info>
      ) : viewModelState.examRegistrationsExisting.length === 0 ? (
        <Info className="w-50">Nema prijavljenih ispita</Info>
      ) : (
        <Table
          width="50vw"
          headers={[
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Espb", value: "courseEspb" },
            { title: "Vreme polaganja", value: "examDateTimeFormatted" },
            { title: "Odjavi", value: "deleteExamRegistration" },
          ]}
          items={viewModelState.examRegistrationsExisting}
          colWidths={[2, 1, 2, 1]}
          templates={{
            deleteExamRegistration: (examRegistration) => (
              <Button
                onClick={() =>
                  viewModel.deleteExamRegistration(examRegistration)
                }
                disabled={!examRegistration.isRegistrationInProgress}
                tooltip={
                  !examRegistration.isRegistrationInProgress
                    ? "Period za odjavu je istekao"
                    : undefined
                }
                icon="fa fa-minus"
              />
            ),
          }}
        />
      )}
    </Container>
  );
};

export default ExamRegistrationsActionsPage;
