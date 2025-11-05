/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import CourseExamReportViewModel from "@/viewModel/CourseExamReportViewModel";
import TextInput from "@/components/custom/TextInput";
import type { TextInputHandle } from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import { CourseExamPageCriteria } from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import { clear } from "console";
import { set } from "lodash";

const CourseExamReportPage = () => {
  const alertService = useAlertService();
  const viewModel = useMemo(
    () => new CourseExamReportViewModel(alertService),
    []
  );
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  const [searchedCourseName, setSearchedCourseName] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<TextInputHandle>(null);

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
      pageSize: viewModelState.pageSize,
      courseName: searchedCourseName,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    viewModel.searchCourseExams(pageCriteria);
  };

  const clearFilters = (): void => {
    setPage(1);
    searchInputRef.current?.clear();
    setDateFrom(null);
    setDateTo(null);
  };

  // Computed function to manage clear filters button visibility (reactive)
  const isRemoveFiltersVisible = () =>
    dateFrom !== null ||
    dateTo !== null ||
    searchedCourseName.trim().length > 0;

  //#region OnMount
  useEffect(() => {
    handlePageChange(page);
  }, [searchedCourseName, dateFrom, dateTo]);
  //#endregion OnMount

  return (
    <Container>
      <Title>Izveštaj polaganja</Title>
      {viewModelState.courseExams.length === 0 &&
      viewModelState.isLoadingCourseExams === true ? (
        <Info>učitava se...</Info>
      ) : (
        <>
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
          <Table
            width="75vw"
            headers={[
              { title: "Naziv ispita", value: "courseName" },
              { title: "Ispitni rok", value: "examPeriodName" },
              { title: "Datum polaganja", value: "examDateTimeFormatted" },
              { title: "Izveštaj", value: "actions" },
            ]}
            colWidths={[3, 3, 2, 1]}
            items={viewModelState.courseExams}
            templates={{
              actions: (ce) => (
                <Button
                  tooltip="Preuzmi izveštaj"
                  icon="fa fa-file-download"
                  iconSize="1.2rem"
                  onClick={() => viewModel.downloadCourseExamReport(ce)}
                />
              ),
            }}
          />
          <Pagination
            currentPage={page}
            totalPages={viewModelState.totalPages}
            onPageChange={(page: number) => handlePageChange(page)}
          />
        </>
      )}
    </Container>
  );
};

export default CourseExamReportPage;
