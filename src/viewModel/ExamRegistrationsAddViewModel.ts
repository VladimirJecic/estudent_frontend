import {
  CourseExam,
  ExamRegistration,
  ExamRegistrationPresentation,
  CourseExamPresentation,
  SubmitExamRegistration,
  AlertServiceContextType,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import { useAlertService } from "@/context/AlertServiceContext";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";

export default class ExamRegistrationsAddViewModel {
  #courseExamRegistrationCandidates: CourseExamPresentation[];
  #examRegistrationsExisting: ExamRegistrationPresentation[];
  #isLoadingExamRegistrationCandidates: boolean;
  #isLoadingExamRegistrationsExisting: boolean;
  #alertService: AlertServiceContextType;
  updateView: (() => void) | undefined;

  constructor(alertService: AlertServiceContextType) {
    this.#courseExamRegistrationCandidates = [];
    this.#examRegistrationsExisting = [];
    this.#isLoadingExamRegistrationCandidates = true;
    this.#isLoadingExamRegistrationsExisting = true;
    this.#alertService = alertService;
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
    const alertService = useAlertService();
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
    const alertService = useAlertService();
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
      this.#alertService?.alert("Ispit je uspešno prijavljen.");
      await this.setupView();
    } catch (error) {
      this.#alertService?.error("Neuspešna prijava ispita.");
      console.error(error);
    }
  }

  async deleteExamRegistration(examRegistration: ExamRegistration) {
    try {
      await ExamRegistrationAPIService.deleteExamRegistration(
        examRegistration.id
      );
      this.#alertService?.alert("Ispit je uspešno odjavljen.");
      await this.setupView();
    } catch (error) {
      this.#alertService?.error("Neuspešna odjava ispita.");
      console.error(error);
    }
  }
}
