import Course from "./Course.js";
import { dateTimeToString } from "../../../utils/DateUtility.js";
export default class CourseExam {
  course;
  examDateTime;
  hall;
  constructor() {
    this.course = {};
    this.examDateTime = new Date();
    this.hall = "";
  }

  withJSON(json) {
    this.course = new Course().withJSON(json.course);
    this.examDateTime = dateTimeToString(Date(json.examDateTime));
    this.hall = json.hall;
    return this;
  }
}
