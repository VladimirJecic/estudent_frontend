import { ExamPeriod, ExamPeriodPresentation } from "@/types/items";
import { dateToString } from "@/utils/dateUtility";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";

export function toExamPeriodPresentation(
  period: ExamPeriod
): ExamPeriodPresentation {
  return {
    ...period,
    dateRegistrationStartFormatted: dateToString(period.dateRegistrationStart),
    dateRegistrationEndFormatted: dateToString(period.dateRegistrationEnd),
    dateStartFormatted: dateToString(period.dateStart),
    dateEndFormatted: dateToString(period.dateEnd),
    courseExamPresentations: toCourseExamPresentations(period.courseExams),
  };
}

export function toExamPeriodPresentations(
  examPeriods: ExamPeriod[]
): ExamPeriodPresentation[] {
  return examPeriods.map(toExamPeriodPresentation);
}
