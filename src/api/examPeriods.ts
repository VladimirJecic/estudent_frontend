import apiService from "@/api/index";
import { ExamPeriod } from "@/types/items";

export class ExamPeriodAPIService {
  static async getActiveExamPeriods() {
    const response = await apiService.GET<ExamPeriod[]>(
      "/exam-periods?onlyActive=true"
    );
    return response;
  }
}
