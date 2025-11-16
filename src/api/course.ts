import {
  CourseInstance,
  CourseInstancePageCriteria,
  PageResponse,
  Semester,
} from "@/types/items";
import { CourseSemesterReport } from "@/types/report";
import apiService from ".";

export class CourseAPIService {
  static createQueryString(pageCriteria: CourseInstancePageCriteria): string {
    const queryParams: string[] = [];
    queryParams.push(`page=${encodeURIComponent(pageCriteria.page)}`);
    queryParams.push(`page-size=${encodeURIComponent(pageCriteria.pageSize)}`);
    if (pageCriteria.searchText && pageCriteria.searchText.length > 0)
      queryParams.push(
        `search-text=${encodeURIComponent(pageCriteria.searchText)}`
      );
    if (pageCriteria.semesterId)
      queryParams.push(
        `semester-id=${encodeURIComponent(pageCriteria.semesterId)}`
      );
    return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  }

  static async getCourseInstancesByCriteria(
    pageCriteria: CourseInstancePageCriteria
  ): Promise<PageResponse<CourseInstance>> {
    const queryParams = this.createQueryString(pageCriteria);
    const response = await apiService.GET<PageResponse<CourseInstance>>(
      `/admin/course-instances${queryParams}`
    );
    return response;
  }

  static async getAllSemesters(): Promise<Semester[]> {
    const response = await apiService.GET<Semester[]>(`/admin/semesters`);
    return response;
  }

  static async getCourseSemesterReport(
    courseInstanceId: number
  ): Promise<CourseSemesterReport> {
    const response = await apiService.GET<CourseSemesterReport>(
      `/admin/course-report-data/${courseInstanceId}`
    );
    return response;
  }

  static async getCourseSemesterReportMock(
    courseInstanceId: number
  ): Promise<CourseSemesterReport> {
    // TODO: Replace mock with real API call once backend is ready.
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockPeriods = [
      { examPeriodId: 1, examPeriodName: "Januar", value: 80 },
      { examPeriodId: 2, examPeriodName: "April", value: 65 },
      { examPeriodId: 3, examPeriodName: "Jun", value: 90 },
    ];

    return {
      title: `Izveštaj za predmet Kurs #${courseInstanceId} u školskoj 2024/2025.`,
      attendanceSeries: mockPeriods,
      passageSeries: mockPeriods.map((p) => ({ ...p, value: p.value - 15 })),
      averageGradesSeries: mockPeriods.map((p) => ({
        ...p,
        value: 8 + p.value / 40,
      })),
      enrolledCount: 120,
      passedCount: 86,
    };
  }
}
