/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useCallback } from "react";
import { dateToString } from "@/utils/DateUtility.js";
import IzvestajPolaganjaViewModel from "@/viewModel/IzvestajPolaganjaViewModel.js";
import TextInput from "@/components/custom/TextInput";
import Pagination from "@/components/custom/Pagination.jsx";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import { CourseExamPageCriteria } from "@/types/items.js";

const IzvestajPolaganja = () => {
  const viewModel = useMemo(() => new IzvestajPolaganjaViewModel(), []);
  const [viewModelState, setViewModelState] = useState(viewModel.project());
  viewModel.updateView = () => {
    setViewModelState(viewModel.project());
  };

  const [courseName, setCourseName] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const debouncedHandleChangeCourseName = useCallback(
    debounce((value: string) => {
      return handleChangeCourseName(value);
    }, 500),
    []
  );

  const handleChangeCourseName = (value: string) => {
    if (value.length > 2) {
      setPage(1);
      searchCourseExams();
    }
  };
  const searchCourseExams = () => {
    const pageCriteria: CourseExamPageCriteria = {
      page: page,
      pageSize: pageSize,
      courseName: courseName,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };

    viewModel.searchCourseExams(pageCriteria);
  };

  //#region OnMount
  useEffect(() => {
    searchCourseExams();
  }, [viewModel]);
  //#endregion OnMount
  return (
    <div>
      <h2 className="mb-4">Izveštaj polaganja</h2>
      {viewModelState.courseExams.length === 0 &&
      viewModelState.ucitavaSe === true ? (
        <div className="bg-info w-50 text-center ">
          <h5> {"učitava se..."}</h5>
        </div>
      ) : (
        <>
          <div className="d-inline-flex p-2 align-items-center justify-content-around">
            <TextInput
              value={courseName}
              onChange={(value: string) => {
                setCourseName(value);
                debouncedHandleChangeCourseName(value);
              }}
              placeholder="Naziv ispita"
              isClearable
            />
            <DatePicker
              placeholderText="Datum od"
              selected={dateFrom}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date | null) => {
                setDateFrom(date);
                searchCourseExams();
              }}
              isClearable={true}
            />
            <DatePicker
              placeholderText="Datum do"
              selected={dateTo}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date | null) => {
                setDateTo(date);
                searchCourseExams();
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
                {viewModelState.courseExams.map((courseExam, key) => (
                  <tr key={key}>
                    <td>
                      <p>{courseExam.course.name}</p>
                    </td>
                    <td>
                      <p>{courseExam.examPeriod.name}</p>
                    </td>
                    <td>
                      <p>{dateToString(courseExam.examDateTime)}</p>
                    </td>
                    <td>
                      <button
                        title="Preuzmi izveštaj"
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          viewModel.downloadCourseExamReport(courseExam)
                        }
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
            onPageChange={(page: number) => {
              setPage(page);
              searchCourseExams();
            }}
          ></Pagination>
        </>
      )}
    </div>
  );
};
export default IzvestajPolaganja;
