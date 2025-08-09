import {
  ExamRegistration,
  ExamRegistrationPresentation,
  UpdateExamRegistration,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";
import alertService from "@/services/AlertService";

export default class ExamRegistrationGradingViewModel {
  #examRegistrationsToGrade: ExamRegistrationPresentation[];
  #isExamRegistrationsLoading: boolean;
  updateView: (() => void) | undefined;

  constructor() {
    this.#examRegistrationsToGrade = [];
    this.#isExamRegistrationsLoading = true;
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

  onExamRegistrationFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: number
  ) => {
    const registration = this.#examRegistrationsToGrade[key];
    const { name, value, type } = event.target;
    let checked: boolean | undefined = undefined;
    if (type === "checkbox" && "checked" in event.target) {
      checked = (event.target as HTMLInputElement).checked;
    }
    switch (name) {
      case "mark":
        registration.mark = Number(value);
        break;
      case "comment":
        registration.comment = value;
        break;
      case "hasAttended":
        (registration as any).hasAttended =
          type === "checkbox" ? checked : value;
        break;
      default:
        console.error("Unexpected field name in onExamRegistrationFieldChange");
        return;
    }
    this.#examRegistrationsToGrade[key] = registration;
    this.updateView?.();
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
      alertService.error(
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
      alertService.success("Izmene su sačuvane.");
      await this.fetchExamRegistrationsToGrade();
    } catch (error) {
      alertService.error("Neuspešno čuvanje izmena.");
      console.error(error);
    }
  }
}
