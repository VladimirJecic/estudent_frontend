import { BlobResponse, CourseExam, DocumentBlob } from "@/types/items";
import { CourseExamPageCriteria, PageResponse } from "@/types/items";
import apiService from ".";

export class CourseExamAPIService {
  static createQueryString(pageCriteria: CourseExamPageCriteria): string {
    const queryParams: string[] = [];
    if (pageCriteria.page !== 0)
      queryParams.push(`page=${encodeURIComponent(pageCriteria.page)}`);
    if (pageCriteria.pageSize !== 0)
      queryParams.push(
        `page-size=${encodeURIComponent(pageCriteria.pageSize)}`
      );
    if ("" !== pageCriteria.courseName)
      queryParams.push(
        `course-name=${encodeURIComponent(pageCriteria.courseName)}`
      );
    if (null !== pageCriteria.dateFrom)
      queryParams.push(
        `date-from=${encodeURIComponent(pageCriteria.dateFrom.toISOString())}`
      );
    if (null !== pageCriteria.dateTo)
      queryParams.push(
        `date-to=${encodeURIComponent(pageCriteria.dateTo.toISOString())}`
      );
    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  }

  static async getCourseExamsByCriteria(
    pageCriteria: CourseExamPageCriteria
  ): Promise<PageResponse<CourseExam>> {
    const queryParams = this.createQueryString(pageCriteria);
    const response: PageResponse<CourseExam> = await apiService.GET(
      `/course-exams${queryParams}`
    );
    return response;
  }
  static async downloadCourseExamReport(
    courseId: number,
    examPeriodId: number
  ): Promise<DocumentBlob> {
    const response = await apiService.GET<BlobResponse>(
      `/course-exam-reports/${courseId}/${examPeriodId}`,
      {
        responseType: "blob",
      }
    );

    const contentDisposition = response.headers.get("Content-Disposition");
    const match = contentDisposition?.match(/filename="?([^"]+)"?/);
    const filename =
      match?.[1] ?? `izvestaj-za-polaganje-${courseId}-${examPeriodId}.xslx`;
    const blob = await response.blob();
    return { blob: blob, name: filename };
  }
}
