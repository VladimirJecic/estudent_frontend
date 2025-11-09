import {
  BlobResponse,
  CourseExam,
  DocumentBlob,
  ExamPeriod,
} from "@/types/items";
import { CourseExamPageCriteria, PageResponse } from "@/types/items";
import apiService from ".";
import { format } from "date-fns/format";

export class CourseExamAPIService {
  static createQueryString(pageCriteria: CourseExamPageCriteria): string {
    const queryParams: string[] = [];
    queryParams.push(`page=${encodeURIComponent(pageCriteria.page)}`);
    queryParams.push(`page-size=${encodeURIComponent(pageCriteria.pageSize)}`);
    if (pageCriteria.courseName.length > 0)
      queryParams.push(
        `course-name=${encodeURIComponent(pageCriteria.courseName)}`
      );
    if (pageCriteria.dateFrom)
      queryParams.push(
        `date-from=${encodeURIComponent(
          format(pageCriteria.dateFrom, "yyyy-MM-dd")
        )}`
      );

    if (null !== pageCriteria.dateTo)
      queryParams.push(
        `date-to=${encodeURIComponent(pageCriteria.dateTo.toISOString())}`
      );
    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  }

  static async getCourseExamsByCriteriaAsAdmin(
    pageCriteria: CourseExamPageCriteria
  ) {
    const queryParams = this.createQueryString(pageCriteria);
    const response = await apiService.GET<PageResponse<CourseExam>>(
      `/admin/course-exams${queryParams}`
    );
    return response;
  }
  static async getRemainingCourseExams(examPeriod: ExamPeriod) {
    const response = await apiService.GET<CourseExam[]>(
      `/course-exams/remaining-course-exams?for-exam-period-id=${examPeriod.id}`,
      {}
    );
    return response;
  }
  static async getRegisterableCourseExams(examPeriod: ExamPeriod) {
    const response = await apiService.GET<CourseExam[]>(
      `/course-exams/registerable-course-exams?for-exam-period-id=${examPeriod.id}`
    );
    return response;
  }
  static async downloadCourseExamReport(
    courseExamId: number
  ): Promise<DocumentBlob> {
    const response = await apiService.GET<BlobResponse>(
      `/admin/course-exam-reports/${courseExamId}`,
      {
        responseType: "blob",
      }
    );
    const contentDisposition = response.headers.get("Content-Disposition");
    const match = contentDisposition?.match(/filename="?([^"]+)"?/);
    const filename = match?.[1] ?? `izvestaj-za-polaganje-${courseExamId}.xslx`;
    const blob = await response.blob();
    return { blob: blob, name: filename };
  }
}
