import {
  CourseInstance,
  CourseInstancePageCriteria,
  PageResponse,
  Semester,
} from "@/types/items";
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
}
