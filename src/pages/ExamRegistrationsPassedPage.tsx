/* eslint-disable react-hooks/exhaustive-deps */
import ExamRegistrationsPassedViewModel from "@/viewModel/ExamRegistrationsPassedViewModel";
import { useMemo, useState, useEffect } from "react";
import { useAlertService } from "@/context/AlertServiceContext";
import Table from "@/components/custom/Table";
import Info from "@/components/custom/Info";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
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
    <Container>
      <Title> Položeni ispiti</Title>
      {viewModelState.isLoadingExamRegistrationsPassed ? (
        <Info className="w-50">učitava se...</Info>
      ) : (
        <Table
          width="60vw"
          headers={[
            { title: "R.Br", value: "rowNum" },
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Ocena", value: "mark" },
            { title: "Espb", value: "courseEspb" },
            { title: "Datum polaganja", value: "updatedAtFormatted" },
            { title: "Potpisao nastavnik", value: "signedByName" },
            { title: "Dodatne informacije", value: "comment" },
          ]}
          colWidths={[1, 2, 1, 1, 2, 2, 2]}
          items={viewModelState.examRegistrationsPassed.map((erp, key) => ({
            ...erp,
            rowNum: key + 1,
          }))}
          footer={`Prosečna ocena: ${viewModelState.averageMark}, Ukupno ostvareno ESPB: ${viewModelState.totalESPB}`}
        />
      )}
    </Container>
  );
};
export default ExamRegistrationsPassedPage;
