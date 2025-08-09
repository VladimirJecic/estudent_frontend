import apiService from "@/api/index";
import { ExamRegistration, CourseExam } from "@/types/items";
import { SubmitExamRegistration } from "@/types/items";

export class ExamRegistrationAPIService {
  static async getPassedExamRegistrations(): Promise<ExamRegistration[]> {
    const response = await apiService.GET<ExamRegistration[]>(
      "/exam-registrations/?excludeFailed=true"
    );
    return response;
  }

  static async fetchCourseExamRegistrationCandidates(): Promise<CourseExam[]> {
    const response = await apiService.GET<CourseExam[]>(
      "/course-exams/registerable-course-exams"
    );
    return response;
  }

  static async fetchExamRegistrationsExisting(): Promise<ExamRegistration[]> {
    const response = await apiService.GET<ExamRegistration[]>(
      "/exam-registrations/not-graded"
    );
    return response;
  }

  static async fetchExamRegistrationsToGrade(): Promise<ExamRegistration[]> {
    const response = await apiService.GET<ExamRegistration[]>(
      "/exam-registrations/not-graded/all"
    );
    return response;
  }

  static async updateExamRegistration(
    examRegistrationId: number,
    dto: import("@/types/items").UpdateExamRegistration
  ): Promise<void> {
    await apiService.PUT(`/exam-registrations/${examRegistrationId}`, dto);
  }

  static async saveExamRegistration(
    dto: SubmitExamRegistration
  ): Promise<void> {
    await apiService.POST("/exam-registrations", dto);
  }

  static async deleteExamRegistration(
    examRegistrationId: number
  ): Promise<void> {
    await apiService.DELETE(`/exam-registrations/${examRegistrationId}`);
  }
}
