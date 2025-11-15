/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  CourseInstancePageCriteria,
  CourseInstance,
  Semester,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import { CourseAPIService } from "@/api/course";
import TextInput from "@/components/custom/TextInput";
import type { TextInputHandle } from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination";
import debounce from "lodash/debounce";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import Select from "@/components/custom/Select";
import log from "loglevel";

const CourseReportPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  const PAGE_SIZE = 10;
  //#endregion Consts

  //#region useState
  const [courseInstances, setCourseInstances] = useState<CourseInstance[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingCourseInstances, setIsLoadingCourseInstances] =
    useState(true);
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<TextInputHandle>(null);
  //#endregion useState

  //#region API Functions
  const fetchSemesters = async () => {
    setIsLoadingSemesters(true);
    try {
      const semesterList = await CourseAPIService.getAllSemesters();
      setSemesters(semesterList);
    } catch (error) {
      alertService.error("Došlo je do greške prilikom učitavanja semestara.");
      log.error(error);
    } finally {
      setIsLoadingSemesters(false);
    }
  };

  const searchCourseInstances = async (
    pageCriteria: CourseInstancePageCriteria
  ) => {
    setIsLoadingCourseInstances(true);
    try {
      const pageResponse = await CourseAPIService.getCourseInstancesByCriteria(
        pageCriteria
      );
      setCourseInstances(pageResponse.content);
      setTotalPages(pageResponse.totalPages);
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom pretrage instanci predmeta."
      );
      log.error(error);
    } finally {
      setIsLoadingCourseInstances(false);
    }
  };

  const downloadCourseReport = async (courseInstanceId: number) => {
    try {
      alertService.alert(
        "Funkcionalnost preuzimanja izveštaja će biti uskoro dostupna."
      );
      // TODO: Implement the download functionality once API endpoint is ready
      // const documentResponse: DocumentBlob =
      //   await CourseAPIService.downloadCourseReport(courseInstanceId);
      // const url = URL.createObjectURL(documentResponse.blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = documentResponse.name;
      // a.click();
      // URL.revokeObjectURL(url);
    } catch (error) {
      alertService.error("Došlo je do greške prilikom skidanja izveštaja.");
      log.error(error);
    }
  };
  //#endregion API Functions

  //#region Other Handlers
  const debounced_handleChangeCourseName = useCallback(
    debounce((value: string) => {
      if (value.length >= 2) {
        setSearchText(value);
        setPage(1);
      }
    }, 500),
    []
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const pageCriteria: CourseInstancePageCriteria = {
      page: newPage,
      pageSize: PAGE_SIZE,
      searchText: searchText,
      semesterId: selectedSemester?.id,
    };
    searchCourseInstances(pageCriteria);
  };

  const handleSemesterChange = (semester: Semester | null) => {
    setSelectedSemester(semester);
    setPage(1);
  };

  const clearFilters = (): void => {
    setPage(1);
    searchInputRef.current?.clear();
    setSelectedSemester(null);
  };

  const isRemoveFiltersVisible = () =>
    selectedSemester !== null || searchText.trim().length > 0;
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (!isLoadingSemesters) {
      handlePageChange(page);
    }
  }, [searchText, selectedSemester, isLoadingSemesters]);
  //#endregion OnMount

  return (
    <Container width="75vw" className="align-self-center">
      <Title>Izveštaj predmeta</Title>
      <Container
        width="75vw"
        className="flex-row mb-4 gap-3 justify-content-start"
      >
        <div className="col-4">
          <TextInput
            ref={searchInputRef}
            onChange={debounced_handleChangeCourseName}
            onClear={setSearchText}
            placeholder="Naziv predmeta ili godina semestra"
            isClearable
          />
        </div>
        <div className="col-3">
          <Select<Semester>
            items={semesters}
            itemTitle="title"
            itemValue="id"
            value={selectedSemester}
            onChange={handleSemesterChange}
            placeholder="Izaberi semestar"
            returnObject={true}
            isClearable={true}
          />
        </div>
        <div className="col-2 d-flex align-items-end">
          <Button
            icon="fa-solid fa-filter-circle-xmark"
            buttonSize="3rem"
            iconSize="1.4rem"
            tooltip="Očisti filtere"
            onClick={() => clearFilters()}
            visible={isRemoveFiltersVisible()}
          />
        </div>
      </Container>
      {isLoadingCourseInstances ? (
        <Info>učitava se...</Info>
      ) : courseInstances.length === 0 ? (
        <Info>Nema predmeta za prikaz</Info>
      ) : (
        <>
          <Table
            width="75vw"
            headers={[
              { title: "Naziv predmeta", value: "name" },
              { title: "Semestar", value: "semester" },
              { title: "Izveštaj", value: "actions" },
            ]}
            colWidths={[5, 4, 1]}
            items={courseInstances}
            templates={{
              actions: (ci) => (
                <Button
                  tooltip="Preuzmi izveštaj (PDF)"
                  icon="fa-solid fa-file-pdf"
                  iconSize="1.2rem"
                  buttonSize="2.3rem"
                  onClick={() => downloadCourseReport(ci.id)}
                />
              ),
            }}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page: number) => handlePageChange(page)}
          />
        </>
      )}
    </Container>
  );
};

export default CourseReportPage;
