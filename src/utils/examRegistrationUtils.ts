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
    examPeriodName: reg.courseExam.examPeriod.name,
    courseEspb: reg.courseExam.course.espb,
    updatedAtFormatted: format(reg.updatedAt, DateFormat.DATE),
    signedByName: reg.signedBy?.name || "",
    examDateTimeFormatted: format(
      reg.courseExam.examDateTime,
      DateFormat.DATE_TIME
    ),
    isRegistrationInProgress:
      reg.courseExam.examPeriod.dateRegisterEnd > new Date(),
  };
}

export function toExamRegistrationPresentations(
  regs: ExamRegistration[]
): ExamRegistrationPresentation[] {
  return regs.map(toExamRegistrationPresentation);
}

export function getAverageMark(
  registrations: ExamRegistrationPresentation[]
): string {
  if (registrations.length === 0) {
    return "Nema položenih ispita";
  }
  const sum = registrations.reduce((acc, reg) => acc + Number(reg.mark), 0);
  const numValue = sum / registrations.length;
  return numValue.toFixed(2);
}

export function getTotalESPB(
  registrations: ExamRegistrationPresentation[]
): number {
  return registrations.reduce(
    (acc, reg) => acc + Number(reg.courseExam.course.espb),
    0
  );
}
