import ExamPeriodsPage from "@/pages/ExamPeriodsPage";
import LoginPage from "@/pages/LoginPage";
import ExamRegistrationsPassedPage from "@/pages/ExamRegistrationsPassedPage";
import ExamRegistrationsAddPage from "@/pages/ExamRegistrationsAddPage";
import CourseExamReportPage from "@/pages/CourseExamReportPage";
import ExamRegistrationGrading from "@/pages/ExamRegistrationGradingPage";

export const routes = [
  { path: "/", element: <ExamPeriodsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/passed-exams", element: <ExamRegistrationsPassedPage /> },
  { path: "/exam-registration", element: <ExamRegistrationsAddPage /> },
  { path: "/exam-report", element: <CourseExamReportPage /> },
  { path: "/grade-entry", element: <ExamRegistrationGrading /> },
];
