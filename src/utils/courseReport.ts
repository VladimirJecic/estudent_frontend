import {
  ChartSeries,
  CourseReportPresentation,
  CourseSemesterReport,
  ExamPeriodMetricPoint,
} from "@/types/report";

function toChartSeries(
  label: string,
  points: ExamPeriodMetricPoint[]
): ChartSeries {
  return {
    label,
    data: points.map((p) => p.value),
    categories: points.map((p) => p.examPeriodName),
  };
}

function clampAverageGrade(value: number): number {
  if (Number.isNaN(value)) {
    return 5;
  }

  return Math.min(10, Math.max(5, value));
}

export function toCourseReportPresentation(
  report: CourseSemesterReport
): CourseReportPresentation {
  const passedPercentage = report.enrolledCount
    ? Number(((report.passedCount / report.enrolledCount) * 100).toFixed(2))
    : 0;

  const sanitizedAverageSeries = report.averageGradesSeries.map((point) => ({
    ...point,
    value: clampAverageGrade(point.value),
  }));

  return {
    title: report.title,
    attendance: toChartSeries(
      "Procenat pristustva po rokovima",
      report.attendanceSeries
    ),
    passage: toChartSeries("Prolaznost po rokovima", report.passageSeries),
    averageScore: toChartSeries(
      "Prosečna ocena po rokovima",
      report.averageGradesSeries
    ),
    enrolledCount: report.enrolledCount,
    passedCount: report.passedCount,
    passedPercentage,
  };
}
