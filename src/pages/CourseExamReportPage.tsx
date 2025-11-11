/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import {
  CourseExamPageCriteria,
  DocumentBlob,
  CourseExamPresentation,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import { CourseExamAPIService } from "@/api/courseExams";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import TextInput from "@/components/custom/TextInput";
import type { TextInputHandle } from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import log from "loglevel";

const CourseExamReportPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  const PAGE_SIZE = 4;
  //#endregion Consts

  //#region useState
  const [courseExams, setCourseExams] = useState<CourseExamPresentation[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingCourseExams, setIsLoadingCourseExams] = useState(true);
  const [searchedCourseName, setSearchedCourseName] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<TextInputHandle>(null);
  //#endregion useState

  //#region API Functions
  const searchCourseExams = async (pageCriteria: CourseExamPageCriteria) => {
    setIsLoadingCourseExams(true);
    try {
      const pageResponse =
        await CourseExamAPIService.getCourseExamsByCriteriaAsAdmin(
          pageCriteria
        );
      setCourseExams(toCourseExamPresentations(pageResponse.content));
      setTotalPages(pageResponse.totalPages);
    } catch (error) {
      alertService.error("Došlo je do greške prilikom pretrage polaganja.");
      log.error(error);
    } finally {
      setIsLoadingCourseExams(false);
    }
  };

  const downloadCourseExamReport = async (courseExamId: number) => {
    try {
      const documentResponse: DocumentBlob =
        await CourseExamAPIService.downloadCourseExamReport(courseExamId);
      const url = URL.createObjectURL(documentResponse.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = documentResponse.name;
      a.click();
      URL.revokeObjectURL(url);
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
        setSearchedCourseName(value);
        setPage(1);
      }
    }, 500),
    []
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const pageCriteria: CourseExamPageCriteria = {
      page: newPage,
      pageSize: PAGE_SIZE,
      courseName: searchedCourseName,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    searchCourseExams(pageCriteria);
  };

  const clearFilters = (): void => {
    setPage(1);
    searchInputRef.current?.clear();
    setDateFrom(null);
    setDateTo(null);
  };

  const isRemoveFiltersVisible = () =>
    dateFrom !== null ||
    dateTo !== null ||
    searchedCourseName.trim().length > 0;
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    handlePageChange(page);
  }, [searchedCourseName, dateFrom, dateTo]);
  //#endregion OnMount

  return (
    <Container width="75vw" className="align-self-center">
      <Title>Izveštaj polaganja</Title>
      <Container
        width="75vw"
        className="flex-row mb-4 gap-3 justify-content-start"
      >
        <div className="col-5">
          <TextInput
            ref={searchInputRef}
            onChange={debounced_handleChangeCourseName}
            onClear={setSearchedCourseName}
            placeholder="Naziv ispita"
            isClearable
          />
        </div>
        <div className="col-2">
          <DatePicker
            className="custom-datepicker w-100"
            placeholderText="Datum od"
            selected={dateFrom}
            dateFormat="dd/MM/yyyy"
            onChange={(date: Date | null) => setDateFrom(date)}
            isClearable={true}
          />
        </div>
        <div className="col-2">
          <DatePicker
            className="custom-datepicker w-100"
            placeholderText="Datum do"
            selected={dateTo}
            dateFormat="dd/MM/yyyy"
            onChange={(date: Date | null) => {
              setDateTo(date);
            }}
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
      {isLoadingCourseExams ? (
        <Info>učitava se...</Info>
      ) : courseExams.length === 0 ? (
        <Info>Nema polaganja za prikaz</Info>
      ) : (
        <>
          <Table
            width="75vw"
            headers={[
              { title: "Naziv ispita", value: "courseName" },
              { title: "Ispitni rok", value: "examPeriodName" },
              { title: "Datum polaganja", value: "examDateTimeFormatted" },
              { title: "Izveštaj", value: "actions" },
            ]}
            colWidths={[3, 3, 2, 1]}
            items={courseExams}
            templates={{
              actions: (ce) => (
                <Button
                  tooltip="Preuzmi izveštaj"
                  icon="fa fa-file-download"
                  iconSize="1.2rem"
                  buttonSize="2.3rem"
                  onClick={() => downloadCourseExamReport(ce.id)}
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

export default CourseExamReportPage;
