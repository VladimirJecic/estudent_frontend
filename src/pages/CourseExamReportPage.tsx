/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback } from "react";
import CourseExamReportViewModel from "@/viewModel/CourseExamReportViewModel";
import TextInput from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import { CourseExamPageCriteria } from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Buton from "@/components/custom/Buton";

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

  const debounced_handleChangeCourseName = useCallback(
    debounce((value: string) => {
      if (value.length > 2) setSearchedCourseName(value);
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
          <Container className="mb-4">
            <TextInput
              onChange={(value: string) => {
                debounced_handleChangeCourseName(value);
              }}
              placeholder="Naziv ispita"
              isClearable
            />
            <DatePicker
              className="custom-datepicker mx-3"
              placeholderText="Datum od"
              selected={dateFrom}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date | null) => setDateFrom(date)}
              isClearable={true}
            />
            <DatePicker
              className="custom-datepicker mx-3"
              placeholderText="Datum do"
              selected={dateTo}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date | null) => {
                setDateTo(date);
              }}
              isClearable={true}
            />
          </Container>
          <Table
            width="70vw"
            headers={[
              { title: "Naziv ispita", value: "course.name" },
              { title: "Ispitni rok", value: "examPeriod.name" },
              { title: "Datum polaganja", value: "examDateTimeFormatted" },
              { title: "Izveštaj", value: "actions" },
            ]}
            items={viewModelState.courseExams}
            templates={{
              actions: (ce) => (
                <Buton
                  tooltip="Preuzmi izveštaj"
                  icon="fa fa-file-download"
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
