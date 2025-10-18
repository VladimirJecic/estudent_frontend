import { CourseExamAPIService } from "@/api/courseExams";
import { ExamPeriodAPIService } from "@/api/examPeriods";
import {
  ExamPeriod,
  ExamPeriodPresentation,
  CourseExamPresentation,
} from "@/types/items";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import { toExamPeriodPresentations } from "@/utils/examPeriodUtils";
import { AlertServiceContextType } from "@/types/items";
import HTMLResponseError from "@/error/HTMLResponseError";

export default class ExamPeriodsViewModel {
  #examPeriods: ExamPeriodPresentation[];
  #selectedExamPeriod: ExamPeriodPresentation | undefined;
  #remainingCourseExams: CourseExamPresentation[];
  #allCourseExams: CourseExamPresentation[];
  #isRemainingCourseExamsVisible: boolean;
  #isAllCourseExamsVisible: boolean;
  #isLoadingExamPeriods: boolean;
  #alertService: AlertServiceContextType;
  updateView: (() => void) | undefined;

  constructor(alertService: AlertServiceContextType) {
    this.#examPeriods = [];
    this.#remainingCourseExams = [];
    this.#allCourseExams = [];
    this.#alertService = alertService;
    this.#isLoadingExamPeriods = true;
    this.#isRemainingCourseExamsVisible = false;
    this.#isAllCourseExamsVisible = false;
  }

  project = () => {
    return {
      examPeriods: this.#examPeriods,
      remainingCourseExams: this.#remainingCourseExams,
      allCourseExams: this.#allCourseExams,
      isLoadingExamPeriods: this.#isLoadingExamPeriods,
      isRemainingCourseExamsVisible: this.#isRemainingCourseExamsVisible,
      isAllCourseExamsVisible: this.#isAllCourseExamsVisible,
      selectedExamName: this.#selectedExamPeriod?.name,
    };
  };

  showAllCourseExams = async (examPeriod: ExamPeriodPresentation) => {
    this.#selectedExamPeriod = examPeriod;
    this.#allCourseExams = examPeriod.courseExamPresentations;
    this.#isAllCourseExamsVisible = true;
    this.#isRemainingCourseExamsVisible = false;
    this.updateView?.();
  };
  showRemainingCourseExams = async (examPeriod: ExamPeriodPresentation) => {
    this.#selectedExamPeriod = examPeriod;
    await this.fetchRemainingCourseExams(examPeriod);
    this.#isRemainingCourseExamsVisible = true;
    this.#isAllCourseExamsVisible = false;
    this.updateView?.();
  };
  fetchActiveExamPeriods = async () => {
    this.#isLoadingExamPeriods = true;
    try {
      const periods = await ExamPeriodAPIService.getActiveExamPeriods();
      this.#examPeriods = toExamPeriodPresentations(periods);
    } catch (error) {
      if (error instanceof HTMLResponseError) {
        console.warn("HTML response received");
      } else {
        this.#alertService.error(
          "Došlo je do greške prilikom učitavanja aktuelnih rokova."
        );
        console.error(error);
      }
    } finally {
      this.#isLoadingExamPeriods = false;
      this.updateView?.();
    }
  };
  private fetchRemainingCourseExams = async (examPeriod: ExamPeriod) => {
    this.#remainingCourseExams = [];
    try {
      const courseExams = await CourseExamAPIService.getRemainingCourseExams(
        examPeriod
      );
      this.#remainingCourseExams = toCourseExamPresentations(courseExams);
      this.updateView?.();
    } catch (error) {
      this.#alertService.error("Došlo je do greške prilikom obrade zahteva.");
      console.error(error);
    }
  };
}
