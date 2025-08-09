import { CourseExamAPIService } from "@/api/courseExams";
import { ExamPeriodAPIService } from "@/api/examPeriods";
import {
  ExamPeriod,
  ExamPeriodPresentation,
  CourseExamPresentation,
} from "@/types/items";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import { toExamPeriodPresentations } from "@/utils/examPeriodUtils";
import alertService from "@/services/AlertService";

export default class ExamPeriodsViewModel {
  #examPeriods: ExamPeriodPresentation[];
  #selectedExamPeriod: ExamPeriodPresentation | undefined;
  #remainingCourseExams: CourseExamPresentation[];
  #allCourseExams: CourseExamPresentation[];
  isRemainingCourseExamsVisible: boolean;
  isAllCourseExamsVisible: boolean;
  #isLoadingExamPeriods: boolean;
  updateView: (() => void) | undefined;

  constructor() {
    this.#examPeriods = [];
    this.#remainingCourseExams = [];
    this.#allCourseExams = [];
    this.#isLoadingExamPeriods = true;
    this.isRemainingCourseExamsVisible = false;
    this.isAllCourseExamsVisible = false;
  }

  project = () => {
    return {
      examPeriods: this.#examPeriods,
      remainingCourseExams: this.#remainingCourseExams,
      allCourseExams: this.#allCourseExams,
      isLoadingExamPeriods: this.#isLoadingExamPeriods,
      isRemainingCourseExamsVisible: this.isRemainingCourseExamsVisible,
      isAllCourseExamsVisible: this.isAllCourseExamsVisible,
      selectedExamName: this.#selectedExamPeriod?.name,
    };
  };

  showAllCourseExams = async (examPeriod: ExamPeriodPresentation) => {
    this.#selectedExamPeriod = examPeriod;
    this.#allCourseExams = examPeriod.courseExamPresentations;
    this.isAllCourseExamsVisible = true;
    this.updateView?.();
  };
  showRemainingCourseExams = async (examPeriod: ExamPeriodPresentation) => {
    await this.fetchRemainingCourseExams(examPeriod);
    this.isRemainingCourseExamsVisible = true;
    this.updateView?.();
  };
  fetchActiveExamPeriods = async () => {
    this.#isLoadingExamPeriods = true;
    try {
      const periods = await ExamPeriodAPIService.getActiveExamPeriods();
      this.#examPeriods = toExamPeriodPresentations(periods);
      this.updateView?.();
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja aktuelnih rokova."
      );
      console.error(error);
    } finally {
      this.#isLoadingExamPeriods = false;
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
      alertService.error("Došlo je do greške prilikom obrade zahteva.");
      console.error(error);
    }
  };
}
