import {
  CourseExam,
  ExamRegistration,
  ExamRegistrationPresentation,
  CourseExamPresentation,
  SubmitExamRegistration,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import alertService from "@/services/AlertService";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";

export default class ExamRegistrationsAddViewModel {
  #courseExamRegistrationCandidates: CourseExamPresentation[];
  #examRegistrationsExisting: ExamRegistrationPresentation[];
  #isLoadingExamRegistrationCandidates: boolean;
  #isLoadingExamRegistrationsExisting: boolean;
  updateView: (() => void) | undefined;

  constructor() {
    this.#courseExamRegistrationCandidates = [];
    this.#examRegistrationsExisting = [];
    this.#isLoadingExamRegistrationCandidates = true;
    this.#isLoadingExamRegistrationsExisting = true;
    this.updateView = undefined;
  }

  project = () => {
    return {
      courseExamRegistrationCandidates: this.#courseExamRegistrationCandidates,
      examRegistrationsExisting: this.#examRegistrationsExisting,
      isLoadingExamRegistrationCandidates:
        this.#isLoadingExamRegistrationCandidates,
      isLoadingExamRegistrationsExisting:
        this.#isLoadingExamRegistrationsExisting,
    };
  };

  setupView = async () => {
    await Promise.allSettled([
      this.fetchExamRegistrationsExisting(),
      this.fetchCourseExamRegistrationCandidates(),
    ]);
    this.updateView?.();
  };

  fetchCourseExamRegistrationCandidates = async () => {
    this.#isLoadingExamRegistrationCandidates = true;
    this.#courseExamRegistrationCandidates = [];
    try {
      const courseExams: CourseExam[] =
        await ExamRegistrationAPIService.fetchCourseExamRegistrationCandidates();
      this.#courseExamRegistrationCandidates =
        toCourseExamPresentations(courseExams);
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja kandidata za prijavu ispita."
      );
      console.error(error);
    } finally {
      this.#isLoadingExamRegistrationCandidates = false;
    }
  };

  fetchExamRegistrationsExisting = async () => {
    this.#isLoadingExamRegistrationsExisting = true;
    this.#examRegistrationsExisting = [];
    try {
      const examRegistrations: ExamRegistration[] =
        await ExamRegistrationAPIService.fetchExamRegistrationsExisting();
      this.#examRegistrationsExisting =
        toExamRegistrationPresentations(examRegistrations);
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja prijavljenih ispita."
      );
      console.error(error);
    } finally {
      this.#isLoadingExamRegistrationsExisting = false;
    }
  };

  async saveExamRegistration(courseExam: CourseExam) {
    try {
      const dto: SubmitExamRegistration = { courseExamId: courseExam.id };
      await ExamRegistrationAPIService.saveExamRegistration(dto);
      alertService.success("Ispit je uspešno prijavljen.");
      await this.setupView();
    } catch (error) {
      alertService.error("Neuspešna prijava ispita.");
      console.error(error);
    }
  }

  async deleteExamRegistration(examRegistration: ExamRegistration) {
    try {
      await ExamRegistrationAPIService.deleteExamRegistration(
        examRegistration.id
      );
      alertService.success("Ispit je uspešno odjavljen.");
      await this.setupView();
    } catch (error) {
      alertService.error("Neuspešna odjava ispita.");
      console.error(error);
    }
  }
}
