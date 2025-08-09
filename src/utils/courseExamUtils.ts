import { CourseExam, CourseExamPresentation } from "@/types/items";
import { dateTimeToString } from "@/utils/dateUtility";

export function toCourseExamPresentation(
  exam: CourseExam
): CourseExamPresentation {
  return {
    ...exam,
    courseName: exam.course.name,
    courseSemester: exam.course.semester,
    courseEspb: exam.course.espb,
    examDateTimeFormatted: dateTimeToString(exam.examDateTime),
  };
}

export function toCourseExamPresentations(
  exams: CourseExam[] | undefined
): CourseExamPresentation[] {
  if (!exams) return [];
  return exams.map(toCourseExamPresentation);
}
