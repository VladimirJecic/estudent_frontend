import ExamPeriodsPage from "@/components/pages/ExamPeriodsPage";
import LoginPage from "@/components/pages/LoginPage";
import ExamRegistrationsPassedPage from "@/components/pages/ExamRegistrationsPassedPage";
import ExamRegistrationsAddPage from "@/components/pages/ExamRegistrationsAddPage";
import CourseExamReportPage from "@/components/pages/CourseExamReportPage";
import ExamRegistrationGrading from "@/components/pages/ExamRegistrationGradingPage";

export const routes = [
  { path: "/", element: <ExamPeriodsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/passed-exams", element: <ExamRegistrationsPassedPage /> },
  { path: "/exam-registration", element: <ExamRegistrationsAddPage /> },
  { path: "/exam-report", element: <CourseExamReportPage /> },
  { path: "/grade-entry", element: <ExamRegistrationGrading /> },
];
