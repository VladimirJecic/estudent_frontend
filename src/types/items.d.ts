export type CourseExam = {
  examPeriod: ExamPeriod;
  course: Course;
  examDateTime: Date;
  hall: string;
};

export type ExamPeriod = {
  id?: number;
  name: string;
  dateRegistrationStart: Date;
  dateRegistrationEnd: Date;
  dateStart: Date;
  dateEnd: Date;
  exams: CourseExam[];
};
export type Course = {
  id?: number;
  name: string;
  semester: string;
  espb: number;
  participants: User[];
};
export type User = {
  name: string;
  indexNum: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
  token: string;
};
export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};
export type CourseExamPageCriteria = {
  page: number;
  pageSize: number;
  courseName: string;
  dateFrom: Date | null;
  dateTo: Date | null;
};
export type EStudentApiError = {
  statusCode: int;
  errorMessage: string;
};
export type DocumentBlob = {
  blob: Blob;
  name: string;
};
interface BlobResponse {
  blob(): Promise<Blob>;
  headers: {
    get(name: string): string | null;
  };
}
