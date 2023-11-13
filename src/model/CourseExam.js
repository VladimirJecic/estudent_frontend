import Course from "./Course.js";

export default class CourseExam {
  course;
  examDateTime;
  hall;

  constructor() {
    this.course = {};
    this.examDateTime = new Date();
    this.hall = "";
  }

  fromJSON(json) {
    this.course = new Course().fromJSON(json.course);
    this.examDateTime = new Date(json.examDateTime);
    this.hall = json.hall;
    return this;
  }
}
