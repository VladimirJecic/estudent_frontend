import { CourseExamAPIService } from "@/api/courseExams";
import { CourseExam, DocumentBlob } from "@/types/items";
import { CourseExamPageCriteria } from "@/types/items";
import "@/assets/componentCSS/DatePicker.css";
import { NoContentError } from "@/errors/NoContentError";
export default class IzvestajPolaganjaViewModel {
  #courseExams: CourseExam[];
  #totalPages: number;
  #ucitavaSe: boolean;
  updateView: undefined | (() => void);
  constructor() {
    this.#courseExams = [];
    this.#totalPages = 0;
    this.#ucitavaSe = true;
    this.updateView = undefined;
  }
  project = () => {
    return {
      courseExams: this.#courseExams,
      totalPages: this.#totalPages,
      ucitavaSe: this.#ucitavaSe,
    };
  };

  searchCourseExams = async (pageCriteria: CourseExamPageCriteria) => {
    this.#ucitavaSe = true;
    try {
      const courseExams = await CourseExamAPIService.getCourseExamsByCriteria(
        pageCriteria
      );
      this.#courseExams = courseExams.content;
      this.#totalPages = courseExams.totalPages;
    } catch (error) {
      console.error(error);
      alert("Doslo je do greske prilikom pretrage polaganja");
    } finally {
      this.#ucitavaSe = false;
      this.updateView?.();
    }
  };
  downloadCourseExamReport = async (courseExam: CourseExam) => {
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
      if (error instanceof NoContentError) {
        alert("Nema prijava za ovo polaganje");
      } else {
        console.error(error);
        alert("Doslo je do greske prilikom skidanje izvestaja");
      }
    }
  };
}
