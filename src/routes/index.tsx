import "typeface-poppins";
import ExamPeriodsPage from "@/pages/ExamPeriodsPage";
import LoginPage from "@/pages/LoginPage";
import ExamRegistrationsPassedPage from "@/pages/ExamRegistrationsPassedPage";
import ExamRegistrationsActionsPage from "@/pages/ExamRegistrationsActionsPage";
import CourseExamReportPage from "@/pages/CourseExamReportPage";
import ExamRegistrationsGradingPage from "@/pages/ExamRegistrationsGradingPage";

export const routes = [
  { path: "/", element: <ExamPeriodsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/passed-exams", element: <ExamRegistrationsPassedPage /> },
  { path: "/exam-registration", element: <ExamRegistrationsActionsPage /> },
  { path: "/exam-report", element: <CourseExamReportPage /> },
  { path: "/grade-entry", element: <ExamRegistrationsGradingPage /> },
];
