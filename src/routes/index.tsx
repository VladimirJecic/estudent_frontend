import "typeface-poppins";
import ExamPeriodsPage from "@/pages/ExamPeriodsPage";
import LoginPage from "@/pages/LoginPage";
import ExamRegistrationsPassedPage from "@/pages/ExamRegistrationsPassedPage";
import ExamRegistrationsActionsPage from "@/pages/ExamRegistrationsActionsPage";
import CourseReportPage from "@/pages/CourseReportPage";
import CourseExamReportPage from "@/pages/CourseExamReportPage";
import ExamRegistrationsGradingPage from "@/pages/ExamRegistrationsGradingPage";

export const routes = [
  { path: "/", element: <ExamPeriodsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/passed-exams", element: <ExamRegistrationsPassedPage /> },
  { path: "/exam-registration", element: <ExamRegistrationsActionsPage /> },
  { path: "/course-report", element: <CourseReportPage /> },
  { path: "/course-exam-report", element: <CourseExamReportPage /> },
  { path: "/grade-entry", element: <ExamRegistrationsGradingPage /> },
];
