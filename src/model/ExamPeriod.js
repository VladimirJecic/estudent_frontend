import CourseExam from "./CourseExam.js";
export default class ExamPeriod {
  name;
  dateRegistrationStart;
  dateRegistrationEnd;
  dateStart;
  dateEnd;
  exams;

  constructor() {
    this.name = "";
    this.dateRegistrationStart = new Date();
    this.dateRegistrationEnd = new Date();
    this.dateStart = new Date();
    this.dateEnd = new Date();
    this.exams = [];
  }

  withJSON(json) {
    this.name = json.name;
    this.dateRegistrationStart = new Date(json.dateRegistrationStart);
    this.dateRegistrationEnd = new Date(json.dateRegistrationEnd);
    this.dateStart = new Date(json.dateStart);
    this.dateEnd = new Date(json.dateEnd);
    this.exams = json.exams.map((jsonExam) =>
      new CourseExam().withJSON(jsonExam)
    );
    return this;
  }
}
