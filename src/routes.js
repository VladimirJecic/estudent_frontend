import ExamPeriodsPage from "@/components/pages/ExamPeriodsPage";
import ExamRegistrationsPassedViewModel from "@/components/pages/ExamRegistrationsPassedPage";
import ExamRegistrationsAddPage from "@/components/pages/ExamRegistrationsAddPage";
import CourseExamReportPage from "@/components/pages/CourseExamReportPage";
import ExamRegistrationGrading from "@/components/pages/ExamRegistrationGradingPage";

export const routes = [
  { path: "rokovi", element: <ExamPeriodsPage /> },
  { path: "polozeni-ispiti", element: <ExamRegistrationsPassedViewModel /> },
  { path: "prijava-ispita", element: <ExamRegistrationsAddPage /> },
  { path: "izvestaj-polaganja", element: <CourseExamReportPage /> },
  { path: "upis-ocena", element: <ExamRegistrationGrading /> },
];
