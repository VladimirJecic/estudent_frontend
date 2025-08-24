import {
  AlertServiceContextType,
  ExamRegistration,
  ExamRegistrationPresentation,
  UpdateExamRegistration,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";

export default class ExamRegistrationGradingViewModel {
  #examRegistrationsToGrade: ExamRegistrationPresentation[];
  #isExamRegistrationsLoading: boolean;
  #alertService: AlertServiceContextType;
  updateView: (() => void) | undefined;

  constructor(alertService: AlertServiceContextType) {
    this.#examRegistrationsToGrade = [];
    this.#isExamRegistrationsLoading = true;
    this.#alertService = alertService;
    this.updateView = undefined;
  }

  project = () => {
    return {
      examRegistrationsToGrade: this.#examRegistrationsToGrade,
      isExamRegistrationsLoaded: !this.#isExamRegistrationsLoading,
    };
  };

  setupView = async () => {
    await this.fetchExamRegistrationsToGrade();
  };

  fetchExamRegistrationsToGrade = async () => {
    this.#isExamRegistrationsLoading = true;
    this.#examRegistrationsToGrade = [];
    try {
      const examRegistrations: ExamRegistration[] =
        await ExamRegistrationAPIService.fetchExamRegistrationsToGrade();
      this.#examRegistrationsToGrade =
        toExamRegistrationPresentations(examRegistrations);
    } catch (error) {
      this.#alertService?.error(
        "Došlo je do greške prilikom učitavanja neocenjenih polaganja."
      );
      console.error(error);
    } finally {
      this.#isExamRegistrationsLoading = false;
      this.updateView?.();
    }
  };

  async saveExamRegistrationUpdate(
    examRegistration: ExamRegistrationPresentation
  ) {
    const dto: UpdateExamRegistration = {
      mark: examRegistration.mark,
      hasAttended: examRegistration.hasAttended,
      comment: examRegistration.comment,
    };
    try {
      await ExamRegistrationAPIService.updateExamRegistration(
        examRegistration.id,
        dto
      );
      this.#alertService?.alert("Izmene su sačuvane.");
      await this.fetchExamRegistrationsToGrade();
    } catch (error) {
      this.#alertService?.error("Neuspešno čuvanje izmena.");
      console.error(error);
    }
  }
}
