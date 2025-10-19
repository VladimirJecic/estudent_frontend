/* eslint-disable react-hooks/exhaustive-deps */
import ExamPeriodsViewModel from "@/viewModel/ExamPeriodsViewModel";
import { useUser } from "@/context/UserContext";
import { useEffect, useState, useMemo } from "react";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
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
    <Container>
      <Title>Rokovi</Title>
      {viewModelState.examPeriods.length === 0 &&
      viewModelState.isLoadingExamPeriods === true ? (
        <Info>učitava se...</Info>
      ) : (
        <Table
          width="70vw"
          className="mb-5"
          headers={[
            {
              title: "Rok",
              value: "name",
            },
            {
              title: "Prijava od",
              value: "dateRegistrationStartFormatted",
            },
            {
              title: "Prijava do",
              value: "dateRegistrationEndFormatted",
            },
            {
              title: "Datum početka",
              value: "dateStartFormatted",
            },
            {
              title: "Datum završetka",
              value: "dateEndFormatted",
            },
            {
              title: "Ispiti",
              value: "actions",
            },
          ]}
          items={viewModelState.examPeriods}
          templates={{
            actions: (rok) => (
              <div className="d-flex flex-row gap-2">
                {!user?.isAdmin && (
                  <Button
                    className="fs-6"
                    onClick={() => viewModel.showRemainingCourseExams(rok)}
                  >
                    moji
                  </Button>
                )}
                <Button
                  className="fs-6"
                  onClick={() => viewModel.showAllCourseExams(rok)}
                >
                  svi
                </Button>
              </div>
            ),
          }}
        />
      )}
      {viewModelState.isAllCourseExamsVisible && (
        <>
          <Title>Svi Ispiti za {viewModelState.selectedExamName}</Title>
          <Table
            width="70vw"
            colWidths={[3, 2, 1, 2, 1]}
            headers={[
              { title: "Predmet", value: "courseName" },
              { title: "Semestar", value: "courseSemester" },
              { title: "Espb", value: "courseEspb" },
              { title: "Vreme Polaganja", value: "examDateTimeFormatted" },
              { title: "Sala", value: "hall" },
            ]}
            items={viewModelState.allCourseExams}
          />
        </>
      )}
      {viewModelState.isRemainingCourseExamsVisible && (
        <>
          <Title>Moji Ispiti za {viewModelState.selectedExamName}</Title>
          <Table
            width="70vw"
            colWidths={[3, 2, 1, 2, 1]}
            headers={[
              { title: "Predmet", value: "courseName" },
              { title: "Semestar", value: "courseSemester" },
              { title: "Espb", value: "courseEspb" },
              { title: "Vreme Polaganja", value: "examDateTimeFormatted" },
              { title: "Sala", value: "hall" },
            ]}
            items={viewModelState.remainingCourseExams}
          />
        </>
      )}
    </Container>
  );
};

export default ExamPeriodsPage;
