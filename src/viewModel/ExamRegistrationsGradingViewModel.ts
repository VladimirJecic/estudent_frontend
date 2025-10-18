import {
  AlertServiceContextType,
  ExamRegistration,
  ExamRegistrationPageCriteria,
  ExamRegistrationPresentation,
  PageResponse,
  UpdateExamRegistration,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";
import log from "loglevel";

export default class ExamRegistrationsGradingViewModel {
  #examRegistrationsToGrade: ExamRegistrationPresentation[];
  #isExamRegistrationsLoading: boolean;
  #alertService: AlertServiceContextType;
  #pageSize: number;
  #totalPages: number;
  updateView: (() => void) | undefined;

  constructor(alertService: AlertServiceContextType) {
    this.#examRegistrationsToGrade = [];
    this.#isExamRegistrationsLoading = true;
    this.#alertService = alertService;
    this.#pageSize = 10;
    this.#totalPages = 0;
    this.updateView = undefined;
  }

  project = () => {
    return {
      examRegistrationsToGrade: this.#examRegistrationsToGrade,
      isExamRegistrationsLoading: this.#isExamRegistrationsLoading,
      pageSize: this.#pageSize,
      totalPages: this.#totalPages,
    };
  };

  setupView = async (pageCriteria: ExamRegistrationPageCriteria) => {
    await this.fetchExamRegistrationsToGrade(pageCriteria);
  };

  fetchExamRegistrationsToGrade = async (
    pageCriteria: ExamRegistrationPageCriteria
  ) => {
    this.#isExamRegistrationsLoading = true;
    this.#examRegistrationsToGrade = [];
    try {
      const pageResponse: PageResponse<ExamRegistration> =
        await ExamRegistrationAPIService.fetchExamRegistrationsToGrade(
          pageCriteria
        );
      this.#examRegistrationsToGrade = toExamRegistrationPresentations(
        pageResponse.content
      );
      this.#totalPages = pageResponse.totalPages;

      this.updateView?.();
    } catch (error) {
      this.#alertService?.error(
        "Došlo je do greške prilikom učitavanja neocenjenih polaganja."
      );
      log.error(error);
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
      const pageCriteria: ExamRegistrationPageCriteria = {
        page: 1,
        pageSize: this.#pageSize,
      };
      await this.fetchExamRegistrationsToGrade(pageCriteria);
    } catch (error) {
      this.#alertService?.error("Neuspešno čuvanje izmena.");
      log.error(error);
    }
  }

  editExamRegistration = (examRegistration: ExamRegistrationPresentation) => {
    // TODO: Implementirati edit funkcionalnost
    console.log("Edit exam registration:", examRegistration);
    this.#alertService?.alert(
      "Funkcionalnost izmene će biti implementirana uskoro."
    );
  };

  deleteExamRegistration = (examRegistration: ExamRegistrationPresentation) => {
    // TODO: Implementirati delete funkcionalnost
    console.log("Delete exam registration:", examRegistration);
    this.#alertService?.alert(
      "Funkcionalnost brisanja će biti implementirana uskoro."
    );
  };
}
