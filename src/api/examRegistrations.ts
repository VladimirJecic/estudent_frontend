import apiService from "@/api/index";
import {
  ExamRegistration,
  CourseExam,
  PageResponse,
  ExamRegistrationPageCriteria,
  UpdateExamRegistrationSubmitRequest,
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
        `search-text=${encodeURIComponent(pageCriteria.searchText)}`
      );
    if (pageCriteria.includePassed) queryParams.push(`include-passed=true`);

    if (pageCriteria.includeFailed) queryParams.push(`include-failed=true`);
    if (pageCriteria.includeNotGraded)
      queryParams.push(`include-not-graded=true`);
    if (pageCriteria.examPeriodId)
      queryParams.push(
        `exam-period-id=${encodeURIComponent(pageCriteria.examPeriodId)}`
      );
    if (pageCriteria.courseExamId)
      queryParams.push(
        `course-exam-id=${encodeURIComponent(pageCriteria.courseExamId)}`
      );
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
    const response = await apiService.GET<ExamRegistration[]>(
      "/exam-registrations/passed"
    );
    return response;
  }

  static async fetchCourseExamRegistrationCandidates() {
    const response = await apiService.GET<CourseExam[]>(
      "/course-exams/registerable-course-exams"
    );
    return response;
  }

  static async fetchCurrentExamRegistrations() {
    const response = await apiService.GET<ExamRegistration[]>(
      "/exam-registrations/current"
    );
    return response;
  }

  static async fetchExamRegistrationsToGrade(
    pageCriteria: ExamRegistrationPageCriteria
  ) {
    const queryParams =
      this.createQueryStringForFetchExamRegistrationsToGrade(pageCriteria);
    const response = await apiService.GET<PageResponse<ExamRegistration>>(
      `/admin/exam-registrations${queryParams}`
    );
    return response;
  }

  static async updateExamRegistration(
    updateRequest: UpdateExamRegistrationSubmitRequest
  ): Promise<void> {
    await apiService.PUT(
      `/admin/exam-registrations/${updateRequest.examRegistrationId}`,
      updateRequest
    );
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
