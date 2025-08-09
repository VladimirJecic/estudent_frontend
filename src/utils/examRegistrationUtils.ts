import { ExamRegistration, ExamRegistrationPresentation } from "@/types/items";
import { dateToString } from "@/utils/dateUtility";

export function toExamRegistrationPresentation(
  reg: ExamRegistration
): ExamRegistrationPresentation {
  return {
    ...reg,
    studentIndexNum: reg.student?.indexNum || "",
    studentName: reg.student?.name || "",
    courseName: reg.courseExam.course.name,
    courseEspb: reg.courseExam.course.espb,
    updatedAtFormatted: dateToString(reg.updatedAt),
    signedByName: reg.signedBy?.name || "",
    examDateTimeFormatted: dateToString(reg.courseExam.examDateTime),
  };
}

export function toExamRegistrationPresentations(
  regs: ExamRegistration[]
): ExamRegistrationPresentation[] {
  return regs.map(toExamRegistrationPresentation);
}
