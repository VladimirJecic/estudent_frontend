/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback } from "react";
import ExamRegistrationsGradingViewModel from "@/viewModel/ExamRegistrationsGradingViewModel";
import { ExamRegistrationPageCriteria } from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Buton from "@/components/custom/Buton";
import TextInput from "@/components/custom/TextInput";
import CheckBox from "@/components/custom/CheckBox";
import Pagination from "@/components/custom/Pagination";
import debounce from "lodash/debounce";

const ExamRegistrationsGradingPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(
    () => new ExamRegistrationsGradingViewModel(alertService),
    []
  );
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  const [searchText, setSearchText] = useState("");
  const [includeNotGraded, setIncludeNotGraded] = useState(true);
  const [includePassed, setIncludePassed] = useState(false);
  const [includeFailed, setIncludeFailed] = useState(false);
  const [page, setPage] = useState(1);

  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  const debounced_handleChangeSearchText = useCallback(
    debounce((value: string) => {
      setSearchText(value);
      setPage(1); // Reset to first page on search
    }, 500),
    []
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const pageCriteria: ExamRegistrationPageCriteria = {
      page: newPage,
      pageSize: viewModelState.pageSize,
      searchText: searchText,
      includePassed: includePassed,
      includeFailed: includeFailed,
      includeNotGraded: includeNotGraded,
    };
    viewModel.setupView(pageCriteria);
  };

  //#region OnMount
  useEffect(() => {
    handlePageChange(page);
  }, [searchText]);
  //#endregion OnMount
  return (
    <Container>
      <Title>Polaganja</Title>
      {viewModelState.examRegistrationsToGrade.length === 0 &&
      !viewModelState.isExamRegistrationsLoading ? (
        <Info>Učitava se...</Info>
      ) : (
        <>
          <Container className="mb-4">
            <TextInput
              onChange={(value: string) => {
                debounced_handleChangeSearchText(value);
              }}
              placeholder="Pretraga Polaganja"
              isClearable
            />
            <CheckBox
              checked={includeNotGraded}
              onChange={(checked) => {
                setIncludeNotGraded(checked);
                setPage(1);
              }}
              label="Prikaži neocenjena polaganja"
              className="ms-3"
            />
            <CheckBox
              checked={includePassed}
              onChange={(checked) => {
                setIncludePassed(checked);
                setPage(1);
              }}
              label="Prikaži uspešna polaganja"
              className="ms-3"
            />
            <CheckBox
              checked={includeFailed}
              onChange={(checked) => {
                setIncludeFailed(checked);
                setPage(1);
              }}
              label="Prikaži neuspešna polaganja"
              className="ms-3"
            />
          </Container>
          {viewModelState.examRegistrationsToGrade.length === 0 ? (
            <Info>Nema polaganja za prikaz</Info>
          ) : (
            <>
              <Table
                width="90vw"
                headers={[
                  { title: "Broj indexa", value: "studentIndexNum" },
                  { title: "Ime", value: "studentName" },
                  { title: "Naziv Ispita", value: "courseName" },
                  { title: "Prisustvovao", value: "hasAttended" },
                  { title: "Ocena", value: "mark" },

                  { title: "Akcije", value: "actions" },
                ]}
                items={viewModelState.examRegistrationsToGrade}
                templates={{
                  mark: (registration) => (
                    <span>{registration.mark ?? "/"}</span>
                  ),
                  hasAttended: (registration) => (
                    <span>{registration.hasAttended ? "Da" : "Ne"}</span>
                  ),
                  actions: (registration) => (
                    <div className="d-flex flex-row gap-2">
                      <Buton
                        tooltip="Izmeni polaganje"
                        icon="fa fa-edit"
                        onClick={() =>
                          viewModel.editExamRegistration(registration)
                        }
                      />
                      <Buton
                        tooltip="Obriši polaganje"
                        icon="fa fa-trash"
                        onClick={() =>
                          viewModel.deleteExamRegistration(registration)
                        }
                        className="bg-danger"
                      />
                    </div>
                  ),
                }}
              />
              <Pagination
                currentPage={page}
                totalPages={viewModelState.totalPages}
                onPageChange={(page) => handlePageChange(page)}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ExamRegistrationsGradingPage;
