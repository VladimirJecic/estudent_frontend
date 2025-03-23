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
  fromJSON(json) {
    this.examPeriod = new ExamPeriod().fromJSON(json?.examPeriod);
    this.course = new Course().fromJSON(json?.course);
    this.examDateTime = new Date(json?.examDateTime);
    this.hall = json?.hall;
    return this;
  }
}
