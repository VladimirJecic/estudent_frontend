import Course from "./Course.js";
import DomainObject from "./DomainObject.js";
import ExamPeriod from "./ExamPeriod.js";
export default class CourseExam extends DomainObject {
  examPeriod;
  course;
  examDateTime;
  hall;
  constructor() {
    super();
    this.examPeriod = {};
    this.course = {};
    this.examDateTime = new Date();
    this.hall = "";
  }
  withJSON(json) {
    this.examPeriod = new ExamPeriod().withJSON(json?.examPeriod);
    this.course = new Course().withJSON(json?.course);
    this.examDateTime = new Date(json?.examDateTime);
    this.hall = json?.hall;
    return this;
  }
}
