/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ExamRegistration,
  ExamRegistrationPageCriteria,
  ExamRegistrationPresentation,
  PageResponse,
  UpdateExamRegistrationSubmitRequest,
  ExamPeriodPresentation,
  CourseExamPresentation,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import TextInput from "@/components/custom/TextInput";
import type { TextInputHandle } from "@/components/custom/TextInput";
import CheckBox from "@/components/custom/CheckBox";
import Pagination from "@/components/custom/Pagination";
import DialogWrapper from "@/components/custom/DialogWrapper";
import ExamRegistrationEdit from "@/components/ExamRegistrationEdit";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { ExamPeriodAPIService } from "@/api/examPeriods";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";
import { toExamPeriodPresentations } from "@/utils/examPeriodUtils";
import Select from "@/components/custom/Select";
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
  const [isMoreFiltersVisible, setIsMoreFiltersVisible] = useState(false);
  const [examPeriods, setExamPeriods] = useState<ExamPeriodPresentation[]>([]);
  const [selectedExamPeriod, setSelectedExamPeriod] =
    useState<ExamPeriodPresentation | null>(null);
  const [courses, setCourses] = useState<CourseExamPresentation[]>([]);
  const [selectedCourse, setSelectedCourse] =
    useState<CourseExamPresentation | null>(null);
  const searchInputRef = useRef<TextInputHandle>(null);
  //#endregion
  //#region computed values
  const isRemoveFiltersVisible = () =>
    selectedExamPeriod !== null ||
    searchText.trim().length > 0 ||
    selectedCourse !== null;
  //#endregion computed values

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
      setIsExamRegistrationEditOpen(false);
      await ExamRegistrationAPIService.updateExamRegistration(updateRequest);
      alertService.alert("Polaganje je uspešno ažurirano");
      handlePageOrOtherChange(page);
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
      handlePageOrOtherChange(page);
    } catch (error) {
      log.error(error);
      alertService.error("Greška prilikom brisanja polaganja");
    }
  };

  const fetchExamPeriods = async () => {
    try {
      const examPeriodList = await ExamPeriodAPIService.getAllExamPeriods();
      setExamPeriods(
        toExamPeriodPresentations(examPeriodList).sort((a, b) =>
          a.dateStart > b.dateStart ? -1 : 1
        )
      );
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja ispitnih rokova."
      );
      log.error(error);
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
  const handlePageOrOtherChange = (newPage: number) => {
    setPage(newPage);
    const pageCriteria: ExamRegistrationPageCriteria = {
      page: newPage,
      pageSize: PAGE_SIZE,
      searchText: searchText,
      includePassed: includePassed,
      includeFailed: includeFailed,
      includeNotGraded: includeNotGraded,
      examPeriodId: selectedExamPeriod?.id,
      courseExamId: selectedCourse?.id,
    };
    fetchExamRegistrationsToGrade(pageCriteria);
  };

  const handleExamPeriodChange = (
    examPeriod: ExamPeriodPresentation | null
  ) => {
    setSelectedExamPeriod(examPeriod);
    setSelectedCourse(null);
    if (examPeriod) {
      setCourses(examPeriod.courseExamPresentations || []);
    } else {
      setCourses([]);
    }
    setPage(1);
  };

  const handleCourseChange = (course: CourseExamPresentation | null) => {
    setSelectedCourse(course);
    setPage(1);
  };
  const openEditExamRegistration = (
    registration: ExamRegistrationPresentation
  ) => {
    setSelectedRegistration(registration);
    setIsExamRegistrationEditOpen(true);
  };

  const clearFilters = () => {
    searchInputRef.current?.clear();
    setSelectedExamPeriod(null);
    setSelectedCourse(null);
    setIncludeNotGraded(true);
    setIncludePassed(true);
    setIncludeFailed(true);
    setPage(1);
  };
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    fetchExamPeriods();
  }, []);

  useEffect(() => {
    handlePageOrOtherChange(page);
  }, [
    searchText,
    includeNotGraded,
    includePassed,
    includeFailed,
    selectedExamPeriod,
    selectedCourse,
  ]);
  //#endregion OnMount
  return (
    <Container width="95%" className="align-self-center align-items-start">
      <Title className="align-self-center">Upis ocena</Title>
      <Container className="flex-row mb-4 gap-3 justify-content-start">
        <div className="col-3">
          <TextInput
            ref={searchInputRef}
            onChange={(value: string) => {
              debounced_handleChangeSearchText(value);
            }}
            onClear={setSearchText}
            placeholder="Pretraga Studenta"
            isClearable
          />
        </div>
        <div className="col-3">
          <Select<ExamPeriodPresentation>
            items={examPeriods}
            itemTitle="name"
            itemValue="id"
            value={selectedExamPeriod}
            onChange={handleExamPeriodChange}
            placeholder="Izaberi rok"
            returnObject={true}
            isClearable={true}
          />
        </div>
        <div className="col-3">
          <Select<CourseExamPresentation>
            items={courses}
            itemTitle="courseName"
            itemValue="id"
            value={selectedCourse}
            onChange={handleCourseChange}
            placeholder="Izaberi ispit"
            returnObject={true}
            isClearable={true}
            className={!selectedExamPeriod ? "disabled" : ""}
          />
        </div>
        <div className="col-2 d-flex">
          <Button
            className="w-100"
            title="Više filtera"
            icon="fa-solid fa-filter"
            buttonSize="3rem"
            iconSize="1.4rem"
            tooltip="Prikaži još filtera"
            onClick={() => setIsMoreFiltersVisible(true)}
          />
        </div>
        <div className="col-1 d-flex">
          <Button
            className="bg-secondary"
            icon="fa-solid fa-filter-circle-xmark"
            buttonSize="3rem"
            iconSize="1.4rem"
            tooltip="Očisti filtere"
            onClick={() => clearFilters()}
            visible={isRemoveFiltersVisible()}
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
              { title: "Rok", value: "examPeriodName" },
              { title: "Prisustvovao", value: "hasAttended" },
              { title: "Ocena", value: "mark" },
              { title: "Akcije", value: "actions" },
            ]}
            colWidths={[1, 2, 2, 3, 1, 1, 2]}
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
            onPageChange={(page) => handlePageOrOtherChange(page)}
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
      <DialogWrapper
        isVisible={isMoreFiltersVisible}
        title="Dodatni filteri"
        width={15}
        onCloseDialog={() => setIsMoreFiltersVisible(false)}
      >
        <Container className="flex-column gap-3 align-items-start">
          <CheckBox
            checked={includeNotGraded}
            onChange={(checked) => {
              setIncludeNotGraded(checked);
              setPage(1);
            }}
            label="Neocenjena polaganja"
          />
          <CheckBox
            checked={includePassed}
            onChange={(checked) => {
              setIncludePassed(checked);
              setPage(1);
            }}
            label="Uspešna polaganja"
          />
          <CheckBox
            checked={includeFailed}
            onChange={(checked) => {
              setIncludeFailed(checked);
              setPage(1);
            }}
            label="Neuspešna polaganja"
          />
        </Container>
      </DialogWrapper>
    </Container>
  );
};

export default ExamRegistrationsGradingPage;
