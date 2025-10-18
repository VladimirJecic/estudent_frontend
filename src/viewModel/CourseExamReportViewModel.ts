import { CourseExamAPIService } from "@/api/courseExams";
import { CourseExamPresentation, DocumentBlob } from "@/types/items";
import type {
  CourseExamPageCriteria,
  AlertServiceContextType,
} from "@/types/items";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import log from "loglevel";
export default class CourseExamReportViewModel {
  #courseExams: CourseExamPresentation[];
  #pageSize: number;
  #totalPages: number;
  #isLoadingCourseExams: boolean;
  #alertService: AlertServiceContextType;
  updateView: undefined | (() => void);

  constructor(alertService: AlertServiceContextType) {
    this.#courseExams = [];
    this.#pageSize = 10;
    this.#totalPages = 0;
    this.#isLoadingCourseExams = true;
    this.#alertService = alertService;
    this.updateView = undefined;
  }

  project = () => {
    return {
      courseExams: this.#courseExams,
      pageSize: this.#pageSize,
      totalPages: this.#totalPages,
      isLoadingCourseExams: this.#isLoadingCourseExams,
    };
  };

  searchCourseExams = async (pageCriteria: CourseExamPageCriteria) => {
    this.#isLoadingCourseExams = true;
    try {
      const pageResponse = await CourseExamAPIService.getCourseExamsByCriteria(
        pageCriteria
      );
      this.#courseExams = toCourseExamPresentations(pageResponse.content);
      this.#totalPages = pageResponse.totalPages;
    } catch (error) {
      this.#alertService.error(
        "Došlo je do greške prilikom pretrage polaganja."
      );
      log.error(error);
    } finally {
      this.#isLoadingCourseExams = false;
      this.updateView?.();
    }
  };

  downloadCourseExamReport = async (courseExam: CourseExamPresentation) => {
    try {
      const documentResponse: DocumentBlob =
        await CourseExamAPIService.downloadCourseExamReport(
          courseExam.course.id!,
          courseExam.examPeriod.id!
        );

      const url = URL.createObjectURL(documentResponse.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = documentResponse.name;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      this.#alertService.error(
        "Došlo je do greške prilikom skidanja izveštaja."
      );
      log.error(error);
    }
  };
}
