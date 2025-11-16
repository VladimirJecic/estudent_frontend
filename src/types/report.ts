export interface ExamPeriodMetricPoint {
  examPeriodId: number;
  examPeriodName: string;
  value: number;
}

export interface AttendanceInExamPeriodMetricPoint
  extends ExamPeriodMetricPoint {}

export interface PassageInExamPeriodMetricPoint extends ExamPeriodMetricPoint {}

export interface AverageGradeInExamPeriodMetricPoint
  extends ExamPeriodMetricPoint {}

export type CourseSemesterReport = {
  title: string;
  attendanceSeries: AttendanceInExamPeriodMetricPoint[];
  passageSeries: PassageInExamPeriodMetricPoint[];
  averageGradesSeries: AverageGradeInExamPeriodMetricPoint[];
  enrolledCount: number;
  passedCount: number;
};

export type ChartSeries = {
  label: string;
  data: number[];
  categories: string[];
};

export type CourseReportPresentation = {
  title: string;
  attendance: ChartSeries;
  passage: ChartSeries;
  averageScore: ChartSeries;
  enrolledCount: number;
  passedCount: number;
  passedPercentage: number;
};
