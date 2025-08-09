/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback } from "react";
import CourseExamReportViewModel from "@/viewModel/CourseExamReportViewModel";
import TextInput from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import { CourseExamPageCriteria } from "@/types/items";

const CourseExamReportPage = () => {
  const viewModel = useMemo(() => new CourseExamReportViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  // const [typedCourseName, setTypedCourseName] = useState("");
  const [searchedCourseName, setSearchedCourseName] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const debounced_handleChangeCourseName = useCallback(
    debounce((value: string) => {
      if (value.length > 2) setSearchedCourseName(value);
    }, 500),
    []
  );

  const handlePageChange = (newPage: number) => {
    setPage(page);
    const pageCriteria: CourseExamPageCriteria = {
      page: newPage,
      pageSize: pageSize,
      courseName: searchedCourseName,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    viewModel.searchCourseExams(pageCriteria);
  };

  //#region OnMount
  useEffect(() => {
    const pageCriteria: CourseExamPageCriteria = {
      page: 1,
      pageSize: pageSize,
      courseName: searchedCourseName,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    viewModel.searchCourseExams(pageCriteria);
  }, [searchedCourseName, dateFrom, dateTo]);
  //#endregion OnMount
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <h2 className="mb-4">Izveštaj polaganja</h2>
      {viewModelState.courseExams.length === 0 &&
      viewModelState.isLoadingCourseExams === true ? (
        <div className="bg-info w-50 text-center ">
          <h5> {"učitava se..."}</h5>
        </div>
      ) : (
        <div className="mx-auto mt-3">
          <div className="d-flex w-100 mr-auto  mb-4">
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
          </div>
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th rowSpan={2}>Naziv ispita</th>
                  <th rowSpan={2}>Ispitni rok</th>
                  <th rowSpan={2}>Datum polaganja</th>
                  <th rowSpan={1}>Izveštaj</th>
                </tr>
              </thead>
              <tbody>
                {viewModelState.courseExams.map((ce, key) => (
                  <tr key={key}>
                    <td>
                      <p>{ce.course.name}</p>
                    </td>
                    <td>
                      <p>{ce.examPeriod.name}</p>
                    </td>
                    <td>
                      <p>{ce.examDateTimeFormatted}</p>
                    </td>
                    <td>
                      <button
                        title="Preuzmi izveštaj"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => viewModel.downloadCourseExamReport(ce)}
                      >
                        <i className="fa fa-file-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={viewModelState.totalPages}
            onPageChange={(page: number) => handlePageChange(page)}
          ></Pagination>
        </div>
      )}
    </div>
  );
};
export default CourseExamReportPage;
