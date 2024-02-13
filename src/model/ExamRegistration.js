import CourseExam from "./CourseExam.js";
import User from "./User.js";
export default class ExamRegistration {
  courseExam;
  student;
  signed_by;
  mark;
  comment;
  updated_at;

  constructor() {
    this.courseExam = {};
    this.student = {};
    this.signed_by = {};
    this.mark = -1;
    this.comment = "";
    this.updated_at = new Date();
  }

  withJSON(json) {
    this.courseExam = new CourseExam().withJSON(json.courseExam);
    this.student = new User().withJSON(json.student);
    this.signed_by = new User().withJSON(json.signed_by);
    this.mark = json.mark;
    this.comment = json.comment;
    this.updated_at = new Date(json.updated_at);
    return this;
  }
  withCourseExam(courseExam) {
    this.courseExam = courseExam;
    return this;
  }
}
