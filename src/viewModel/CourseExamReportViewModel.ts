import { CourseExamAPIService } from "@/api/courseExams";
import { CourseExamPresentation, DocumentBlob } from "@/types/items";
import { CourseExamPageCriteria } from "@/types/items";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import alertService from "@/services/AlertService";
export default class CourseExamReportViewModel {
  #courseExams: CourseExamPresentation[];
  #totalPages: number;
  isLoadingCourseExams: boolean;
  updateView: undefined | (() => void);
  constructor() {
    this.#courseExams = [];
    this.#totalPages = 0;
    this.isLoadingCourseExams = true;
    this.updateView = undefined;
  }
  project = () => {
    return {
      courseExams: this.#courseExams,
      totalPages: this.#totalPages,
      isLoadingCourseExams: this.isLoadingCourseExams,
    };
  };

  searchCourseExams = async (pageCriteria: CourseExamPageCriteria) => {
    this.isLoadingCourseExams = true;
    try {
      const pageResponse = await CourseExamAPIService.getCourseExamsByCriteria(
        pageCriteria
      );
      this.#courseExams = toCourseExamPresentations(pageResponse.content);
      this.#totalPages = pageResponse.totalPages;
    } catch (error) {
      alertService.error("Došlo je do greške prilikom pretrage polaganja.");
      console.error(error);
    } finally {
      this.isLoadingCourseExams = false;
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
      alertService.error("Došlo je do greške prilikom skidanja izveštaja.");
      console.error(error);
    }
  };
}
