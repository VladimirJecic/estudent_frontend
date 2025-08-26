import { DateFormat } from "@/types/global";
import { ExamPeriod, ExamPeriodPresentation } from "@/types/items";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import { format } from "date-fns";

export function toExamPeriodPresentation(
  period: ExamPeriod
): ExamPeriodPresentation {
  return {
    ...period,
    dateRegistrationStartFormatted: format(
      period.dateRegisterStart,
      DateFormat.DATE
    ),
    dateRegistrationEndFormatted: format(
      period.dateRegisterEnd,
      DateFormat.DATE
    ),
    dateStartFormatted: format(period.dateStart, DateFormat.DATE),
    dateEndFormatted: format(period.dateEnd, DateFormat.DATE),
    courseExamPresentations: toCourseExamPresentations(period.courseExams),
  };
}

export function toExamPeriodPresentations(
  examPeriods: ExamPeriod[]
): ExamPeriodPresentation[] {
  return examPeriods.map((ep) => toExamPeriodPresentation(ep));
}
