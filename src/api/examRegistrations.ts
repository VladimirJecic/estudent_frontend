import apiService from "@/api/index";
import {
  ExamRegistration,
  CourseExam,
  PageResponse,
  ExamRegistrationPageCriteria,
} from "@/types/items";
import { SubmitExamRegistration } from "@/types/items";

export class ExamRegistrationAPIService {
  static createQueryStringForFetchExamRegistrationsToGrade(
    pageCriteria: ExamRegistrationPageCriteria
  ): string {
    const queryParams: string[] = [];
    if (pageCriteria.page !== 0)
      queryParams.push(`page=${encodeURIComponent(pageCriteria.page)}`);
    if (pageCriteria.pageSize !== 0)
      queryParams.push(
        `page-size=${encodeURIComponent(pageCriteria.pageSize)}`
      );
    if (pageCriteria.searchText && pageCriteria.searchText.length > 0)
      queryParams.push(
        `searchText=${encodeURIComponent(pageCriteria.searchText)}`
      );
    if (pageCriteria.includePassed) queryParams.push(`includePassed=true`);

    if (pageCriteria.includeFailed) queryParams.push(`includeFailed=true`);
    if (pageCriteria.includeNotGraded)
      queryParams.push(`includeNotGraded=true`);
    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  }
  static createQueryStringForCreateExamRegistration(
    pageCriteria: SubmitExamRegistration
  ): string {
    const queryParams: string[] = [];
    if (pageCriteria.courseExamId !== undefined)
      queryParams.push(`course-exam-id=${pageCriteria.courseExamId}`);
    if (pageCriteria.studentId !== undefined)
      queryParams.push(`student-id=${pageCriteria.studentId}`);
    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  }
  static async getPassedExamRegistrations() {
    const response = await apiService.GET<PageResponse<ExamRegistration>>(
      "/exam-registrations?page=1&page-size=200&include-passed=true"
    );
    return response;
  }

  static async fetchCourseExamRegistrationCandidates(): Promise<CourseExam[]> {
    const response = await apiService.GET<CourseExam[]>(
      "/course-exams/registerable-course-exams"
    );
    return response;
  }

  static async fetchExamRegistrationsExisting() {
    const response = await apiService.GET<PageResponse<ExamRegistration>>(
      "/exam-registrations?page=1&page-size=200&include-not-graded=true"
    );
    return response;
  }

  static async fetchExamRegistrationsToGrade(
    pageCriteria: ExamRegistrationPageCriteria
  ) {
    const queryParams =
      this.createQueryStringForFetchExamRegistrationsToGrade(pageCriteria);
    const response = await apiService.GET<PageResponse<ExamRegistration>>(
      `/exam-registrations${queryParams}`
    );
    return response;
  }

  static async updateExamRegistration(
    examRegistrationId: number,
    dto: import("@/types/items").UpdateExamRegistration
  ): Promise<void> {
    await apiService.PUT(`/exam-registrations/${examRegistrationId}`, dto);
  }

  static async createExamRegistration(
    dto: SubmitExamRegistration
  ): Promise<void> {
    const queryParams = this.createQueryStringForCreateExamRegistration(dto);
    await apiService.POST(`/exam-registrations${queryParams}`, dto);
  }

  static async deleteExamRegistration(
    examRegistrationId: number
  ): Promise<void> {
    await apiService.DELETE(`/exam-registrations/${examRegistrationId}`);
  }
}
