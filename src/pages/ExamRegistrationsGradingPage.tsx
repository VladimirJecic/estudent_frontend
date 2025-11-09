/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import {
  ExamRegistration,
  ExamRegistrationPageCriteria,
  ExamRegistrationPresentation,
  PageResponse,
  UpdateExamRegistrationSubmitRequest,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import TextInput from "@/components/custom/TextInput";
import CheckBox from "@/components/custom/CheckBox";
import Pagination from "@/components/custom/Pagination";
import DialogWrapper from "@/components/custom/DialogWrapper";
import ExamRegistrationEdit from "@/components/ExamRegistrationEdit";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";
import debounce from "lodash/debounce";
import log from "loglevel";

const ExamRegistrationsGradingPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  const PAGE_SIZE = 10;
  //#endregion Consts

  //#region useState
  const [examRegistrationPresentations, setExamRegistrationPresentations] =
    useState<ExamRegistrationPresentation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [includeNotGraded, setIncludeNotGraded] = useState(true);
  const [includePassed, setIncludePassed] = useState(true);
  const [includeFailed, setIncludeFailed] = useState(true);
  const [isExamRegistrationsLoading, setIsExamRegistrationsLoading] =
    useState(true);
  const [isExamRegistrationEditOpen, setIsExamRegistrationEditOpen] =
    useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<ExamRegistrationPresentation | null>(null);
  //#endregion useState

  //#region API Functions
  const fetchExamRegistrationsToGrade = async (
    pageCriteria: ExamRegistrationPageCriteria
  ) => {
    setIsExamRegistrationsLoading(true);
    try {
      const pageResponse: PageResponse<ExamRegistration> =
        await ExamRegistrationAPIService.fetchExamRegistrationsToGrade(
          pageCriteria
        );
      setExamRegistrationPresentations(
        toExamRegistrationPresentations(pageResponse.content)
      );
      setTotalPages(pageResponse.totalPages);
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja neocenjenih polaganja."
      );
      log.error(error);
    } finally {
      setIsExamRegistrationsLoading(false);
    }
  };

  const updateExamRegistration = async (
    updateRequest: UpdateExamRegistrationSubmitRequest
  ) => {
    try {
      if (!updateRequest.hasAttended) {
        updateRequest.mark = 5;
      }
      await ExamRegistrationAPIService.updateExamRegistration(updateRequest);
      alertService.alert("Polaganje je uspešno ažurirano");
      handlePageChange(page);
    } catch (error) {
      log.error(error);
      alertService.error("Greška prilikom ažuriranja polaganja");
    }
  };

  const deleteExamRegistration = async (
    examRegistration: ExamRegistrationPresentation
  ) => {
    try {
      await ExamRegistrationAPIService.deleteExamRegistration(
        examRegistration.id
      );
      alertService.alert("Polaganje je uspešno obrisano");
      handlePageChange(page);
    } catch (error) {
      log.error(error);
      alertService.error("Greška prilikom brisanja polaganja");
    }
  };

  //#endregion API Functions
  //#region Other Handlers
  const debounced_handleChangeSearchText = useCallback(
    debounce((value: string) => {
      setSearchText(value);
      setPage(1);
    }, 500),
    []
  );
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const pageCriteria: ExamRegistrationPageCriteria = {
      page: newPage,
      pageSize: PAGE_SIZE,
      searchText: searchText,
      includePassed: includePassed,
      includeFailed: includeFailed,
      includeNotGraded: includeNotGraded,
    };
    fetchExamRegistrationsToGrade(pageCriteria);
  };
  const openEditExamRegistration = (
    registration: ExamRegistrationPresentation
  ) => {
    setSelectedRegistration(registration);
    setIsExamRegistrationEditOpen(true);
  };
  //#endregion Other Handlers
  //#region OnMount
  useEffect(() => {
    handlePageChange(page);
  }, [searchText, includeNotGraded, includePassed, includeFailed]);
  //#endregion OnMount
  return (
    <Container width="95%" className="align-self-center align-items-start">
      <Title className="align-self-center">Upis ocena</Title>
      <Container className="flex-row mb-4 gap-3 justify-content-start">
        <div className="col-5">
          <TextInput
            onChange={(value: string) => {
              debounced_handleChangeSearchText(value);
            }}
            placeholder="Pretraga Polaganja"
            isClearable
          />
        </div>
        <div className="col-2">
          <CheckBox
            checked={includeNotGraded}
            onChange={(checked) => {
              setIncludeNotGraded(checked);
              setPage(1);
            }}
            label="neocenjena polaganja"
            className="ms-3"
          />
        </div>
        <div className="col-2">
          <CheckBox
            checked={includePassed}
            onChange={(checked) => {
              setIncludePassed(checked);
              setPage(1);
            }}
            label="uspešna polaganja"
            className="ms-3"
          />
        </div>
        <div className="col-2">
          <CheckBox
            checked={includeFailed}
            onChange={(checked) => {
              setIncludeFailed(checked);
              setPage(1);
            }}
            label="neuspešna polaganja"
            className="ms-3"
          />
        </div>
      </Container>
      {isExamRegistrationsLoading ? (
        <Info>Učitava se...</Info>
      ) : examRegistrationPresentations.length === 0 ? (
        <Info>Nema polaganja za prikaz</Info>
      ) : (
        <Container>
          <Table
            className="align-self-start"
            width="95%"
            headers={[
              { title: "Broj indexa", value: "studentIndexNum" },
              { title: "Ime", value: "studentName" },
              { title: "Naziv Ispita", value: "courseName" },
              { title: "Prisustvovao", value: "hasAttended" },
              { title: "Ocena", value: "mark" },
              { title: "Akcije", value: "actions" },
            ]}
            items={examRegistrationPresentations}
            templates={{
              mark: (registration: ExamRegistrationPresentation) => (
                <span>{registration.mark ?? "/"}</span>
              ),
              hasAttended: (registration: ExamRegistrationPresentation) => (
                <span>{registration.hasAttended ? "Da" : "Ne"}</span>
              ),
              actions: (registration: ExamRegistrationPresentation) => (
                <div className="d-flex flex-row gap-2">
                  <Button
                    tooltip="Izmeni polaganje"
                    icon="fa fa-edit"
                    buttonSize="2.3rem"
                    onClick={() => openEditExamRegistration(registration)}
                  />
                  <Button
                    tooltip="Obriši polaganje"
                    icon="fa fa-trash"
                    buttonSize="2.3rem"
                    onClick={() => deleteExamRegistration(registration)}
                    className="bg-danger"
                  />
                </div>
              ),
            }}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(page)}
          />
        </Container>
      )}
      <DialogWrapper
        isVisible={isExamRegistrationEditOpen}
        title="Izmena polaganja"
        width={70}
        onCloseDialog={() => setIsExamRegistrationEditOpen(false)}
      >
        {selectedRegistration && (
          <ExamRegistrationEdit
            registration={selectedRegistration}
            onSave={updateExamRegistration}
          />
        )}
      </DialogWrapper>
    </Container>
  );
};

export default ExamRegistrationsGradingPage;
