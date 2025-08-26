import { DateFormat } from "@/types/global";
import { CourseExam, CourseExamPresentation } from "@/types/items";
import { format } from "date-fns";

export function toCourseExamPresentation(
  exam: CourseExam
): CourseExamPresentation {
  return {
    ...exam,
    courseName: exam.course.name,
    courseSemester: exam.course.semester,
    courseEspb: exam.course.espb,
    examDateTimeFormatted: format(exam.examDateTime, DateFormat.DATE_TIME),
  };
}

export function toCourseExamPresentations(
  exams: CourseExam[] | undefined
): CourseExamPresentation[] {
  if (!exams) return [];
  return exams.map(toCourseExamPresentation);
}
