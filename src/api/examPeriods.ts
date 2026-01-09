import apiService from "@/api/index";
import { ExamPeriod } from "@/types/items";

export class ExamPeriodAPIService {
  static async getActiveExamPeriods() {
    const response = await apiService.GET<ExamPeriod[]>(
      "/exam-periods?only-active=true"
    );
    return response;
  }
  static async getAllExamPeriods() {
    const response = await apiService.GET<ExamPeriod[]>("/exam-periods");
    return response;
  }
}
