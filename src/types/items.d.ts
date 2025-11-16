export type UpdateExamRegistrationSubmitRequest = {
  examRegistrationId: number;
  mark: number;
  hasAttended: boolean;
  comment: string;
};
interface ServerResponse {
  success: boolean;
  data?: any;
  message?: string;
  statusCode: number;
}
export interface EStudentAPIError extends ServerResponse {}

export type SubmitExamRegistration = {
  courseExamId: number;
  studentId?: number;
};
export type ExamRegistration = {
  id: number;
  courseExam: CourseExam;
  student: User;
  signedBy: User;
  mark: number;
  comment: string;
  updatedAt: Date;
  hasAttended: boolean;
};
export interface ExamRegistrationPresentation extends ExamRegistration {
  studentIndexNum: string;
  studentName: string;
  examPeriodName: string;
  courseName: string;
  courseEspb: number;
  updatedAtFormatted: string;
  examDateTimeFormatted: string;
  signedByName: string;
  isRegistrationInProgress: boolean;
}
export type CourseExam = {
  id: number;
  examPeriod: ExamPeriod;
  course: Course;
  examDateTime: Date;
  hall: string;
};
export type Semester = {
  id: number;
  title: string;
  year: string;
  season: string;
};
export interface CourseExamPresentation extends CourseExam {
  courseName: string;
  examPeriodName: string;
  semester: Semester;
  courseEspb: number;
  examDateTimeFormatted: string;
  isRegistrationInProgress: boolean;
}
export type ExamPeriod = {
  id?: number;
  name: string;
  dateRegisterStart: Date;
  dateRegisterEnd: Date;
  dateStart: Date;
  dateEnd: Date;
  courseExams: CourseExam[];
};
export interface ExamPeriodPresentation extends ExamPeriod {
  dateRegistrationStartFormatted: string;
  dateRegistrationEndFormatted: string;
  dateStartFormatted: string;
  dateEndFormatted: string;
  courseExamPresentations: CourseExamPresentation[];
}
export type Course = {
  id?: number;
  name: string;
  semester: string;
  espb: number;
  participants: User[];
};
export type CourseInstance = {
  id: number;
  name: string;
  semester: Semester;
  espb: number;
};
export type CourseInstancePageCriteria = {
  page: number;
  pageSize: number;
  searchText?: string;
  semesterId?: number;
};
export type User = {
  name: string;
  indexNum: string;
  email?: string;
  role?: string;
  isAdmin?: boolean;
  token?: string;
};
export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};
export type CourseExamPageCriteria = {
  page: number;
  pageSize: number;
  searchText: string;
  dateFrom: Date | null;
  dateTo: Date | null;
};
export type ExamRegistrationPageCriteria = {
  page: number;
  pageSize: number;
  searchText?: string;
  includePassed?: boolean;
  includeFailed?: boolean;
  includeNotGraded?: boolean;
};
export type EStudentApiError = {
  statusCode: number;
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
export type AlertType = "success" | "error";

export interface AlertState {
  isVisible: boolean;
  type: AlertType;
  message: string;
}

export interface AlertServiceContextType {
  alert: (message: string, isPermanent?: boolean) => void;
  error: (
    message: string,
    isPermanent?: boolean = false,
    error?: Error
  ) => void;
  hide: () => void;
  alertState: AlertState;
  setAlertState: React.Dispatch<React.SetStateAction<AlertState>>;
}
