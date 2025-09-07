import { DateFormat } from "@/types/global";
import { ExamRegistration, ExamRegistrationPresentation } from "@/types/items";
import { format } from "date-fns";

export function toExamRegistrationPresentation(
  reg: ExamRegistration
): ExamRegistrationPresentation {
  return {
    ...reg,
    studentIndexNum: reg.student?.indexNum || "",
    studentName: reg.student?.name || "",
    courseName: reg.courseExam.course.name,
    courseEspb: reg.courseExam.course.espb,
    updatedAtFormatted: format(reg.updatedAt, DateFormat.DATE),
    signedByName: reg.signedBy?.name || "",
    examDateTimeFormatted: format(
      reg.courseExam.examDateTime,
      DateFormat.DATE_TIME
    ),
    isRegistrationInProgress: reg.courseExam.examPeriod.dateRegisterEnd > new Date(),
  };
}

export function toExamRegistrationPresentations(
  regs: ExamRegistration[]
): ExamRegistrationPresentation[] {
  return regs.map(toExamRegistrationPresentation);
}
