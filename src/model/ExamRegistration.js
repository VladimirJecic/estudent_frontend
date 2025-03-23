import CourseExam from "./CourseExam.js";
import User from "./User.js";
import DomainObject from "./DomainObject.js";
export default class ExamRegistration extends DomainObject {
  courseExam;
  student;
  signed_by;
  mark;
  comment;
  updated_at;

  constructor() {
    super();
    this.courseExam = {};
    this.student = {};
    this.signed_by = {};
    this.mark = -1;
    this.comment = "";
    this.updated_at = new Date(0);
  }
  fromJSON(json) {
    this.courseExam = new CourseExam().fromJSON(json?.courseExam);
    this.student = new User().fromJSON(json?.student);
    this.signed_by = new User().fromJSON(json?.signed_by);
    this.mark = json?.mark;
    this.comment = json?.comment;
    this.updated_at = new Date(json?.updated_at);
    return this;
  }
  withCourseExam(courseExam) {
    this.courseExam = courseExam;
    return this;
  }
  withStudent(student) {
    this.student = student;
    return this;
  }
}
