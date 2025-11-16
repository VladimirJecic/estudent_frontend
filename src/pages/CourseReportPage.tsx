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
import DialogWrapper from "@/components/custom/DialogWrapper";
import { downloadCourseReportPdf } from "@/services/reportService";
import { toCourseReportPresentation } from "@/utils/courseReport";
import type { CourseReportPresentation } from "@/types/report";
import CourseReportPreview from "@/components/CourseReportPreview";
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
  const [isReportDialogVisible, setIsReportDialogVisible] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportPresentation, setReportPresentation] =
    useState<CourseReportPresentation | null>(null);
  const [selectedCourseInstance, setSelectedCourseInstance] =
    useState<CourseInstance | null>(null);
  const reportPreviewRef = useRef<HTMLDivElement | null>(null);
  //#endregion useState
  const fallbackReportTitle = selectedCourseInstance
    ? `Izveštaj za predmet ${selectedCourseInstance.name} u školskoj ${
        selectedCourseInstance.semester?.year ||
        selectedCourseInstance.semester?.title ||
        ""
      }.`
    : "Izveštaj kursa";

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

  //#endregion API Functions

  //#region Other Handlers
  const openCourseReportPreview = async (courseInstance: CourseInstance) => {
    setIsReportDialogVisible(true);
    setIsLoadingReport(true);
    setReportPresentation(null);
    setSelectedCourseInstance(courseInstance);

    try {
      const reportResponse = await CourseAPIService.getCourseSemesterReport(
        courseInstance.id
      );
      setReportPresentation(toCourseReportPresentation(reportResponse));
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom pripreme izveštaja kursa."
      );
      setIsReportDialogVisible(false);
      log.error(error);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleCloseReportDialog = () => {
    setIsReportDialogVisible(false);
    setReportPresentation(null);
    setSelectedCourseInstance(null);
  };

  const handleDownloadReport = async () => {
    if (!selectedCourseInstance) return;
    await downloadCourseReportPdf({
      element: reportPreviewRef.current,
      filename: `izvestaj-za-predmet-${selectedCourseInstance.id}.pdf`,
      title: reportPresentation?.title || fallbackReportTitle,
    });
  };
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
            placeholder="Naziv predmeta ili školska godina"
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
              { title: "Školska godina", value: "semester.year" },
              { title: "Semestar", value: "semester.season" },
              { title: "Izveštaj", value: "actions" },
            ]}
            colWidths={[4, 2, 3, 1]}
            items={courseInstances}
            templates={{
              actions: (ci) => (
                <Button
                  tooltip="Pregled izveštaja"
                  icon="fa-solid fa-chart-simple"
                  iconSize="1.2rem"
                  buttonSize="2.3rem"
                  onClick={() => openCourseReportPreview(ci)}
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
      <DialogWrapper
        isVisible={isReportDialogVisible}
        title={reportPresentation?.title || fallbackReportTitle}
        width={70}
        maxHeight={80}
        onCloseDialog={handleCloseReportDialog}
      >
        {isLoadingReport ? (
          <Info>Priprema izveštaja...</Info>
        ) : reportPresentation ? (
          <CourseReportPreview
            report={reportPresentation}
            onDownload={handleDownloadReport}
            onClose={handleCloseReportDialog}
            ref={reportPreviewRef}
          />
        ) : (
          <Info>Odaberite kurs za pregled izveštaja.</Info>
        )}
      </DialogWrapper>
    </Container>
  );
};

export default CourseReportPage;
