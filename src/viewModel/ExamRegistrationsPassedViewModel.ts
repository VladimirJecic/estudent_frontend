import {
  AlertServiceContextType,
  ExamRegistration,
  ExamRegistrationPresentation,
} from "@/types/items";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";

export default class ExamRegistrationsPassedViewModel {
  #examRegistrationsPassed: ExamRegistrationPresentation[];
  #isLoadingExamRegistrationsPassed: boolean;
  #averageMark: string;
  #totalESPB: number;
  #alertService: AlertServiceContextType;
  updateView: (() => void) | undefined;

  constructor(alertService: AlertServiceContextType) {
    this.#alertService = alertService;
    this.#examRegistrationsPassed = [];
    this.#isLoadingExamRegistrationsPassed = true;
    this.#averageMark = "Nema položenih ispita";
    this.#totalESPB = 0;
    this.updateView = undefined;
  }

  project = () => {
    return {
      examRegistrationsPassed: this.#examRegistrationsPassed,
      isLoadingExamRegistrationsPassed: this.#isLoadingExamRegistrationsPassed,
      averageMark: this.#averageMark,
      totalESPB: this.#totalESPB,
    };
  };

  fetchExamRegistrationsPassed = async () => {
    this.#isLoadingExamRegistrationsPassed = true;
    this.#examRegistrationsPassed = [];
    try {
      const pageResponse =
        await ExamRegistrationAPIService.getPassedExamRegistrations();
      this.#examRegistrationsPassed = toExamRegistrationPresentations(
        pageResponse.content
      );
      this.#averageMark = this.getAverageMark();
      this.#totalESPB = this.getTotalESPB();
      this.updateView?.();
    } catch (error) {
      this.#alertService.error(
        "Došlo je do greške prilikom učitavanja položenih ispita."
      );
      log.error(error);
    } finally {
      this.#isLoadingExamRegistrationsPassed = false;
    }
  };

  private getAverageMark(): string {
    if (this.#examRegistrationsPassed.length === 0) {
      return "Nema položenih ispita";
    }
    const sum = this.#examRegistrationsPassed.reduce(
      (acc, reg) => acc + Number(reg.mark),
      0
    );
    const numValue = sum / this.#examRegistrationsPassed.length;
    return this.formatNumberToTwoDecimalPlaces(numValue);
  }

  private getTotalESPB(): number {
    return this.#examRegistrationsPassed.reduce(
      (acc, reg) => acc + Number(reg.courseExam.course.espb),
      0
    );
  }
  private formatNumberToTwoDecimalPlaces(number: number): string {
    const roundedNumber = Math.round(number * 100) / 100;
    const formattedNumber = roundedNumber.toFixed(2);
    return formattedNumber;
  }
}
