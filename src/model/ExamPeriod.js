import CourseExam from "./CourseExam.js";
import DomainObject from "./DomainObject.js";
export default class ExamPeriod extends DomainObject {
  name;
  dateRegistrationStart;
  dateRegistrationEnd;
  dateStart;
  dateEnd;
  exams;

  constructor() {
    super();
    this.id = -1;
    this.name = "";
    this.dateRegistrationStart = new Date(0);
    this.dateRegistrationEnd = new Date(0);
    this.dateStart = new Date(0);
    this.dateEnd = new Date(0);
    this.exams = [];
  }

  withJSON(json) {
    this.id = json?.id;
    this.name = json?.name;
    this.dateRegistrationStart = new Date(json?.dateRegistrationStart);
    this.dateRegistrationEnd = new Date(json?.dateRegistrationEnd);
    this.dateStart = new Date(json?.dateStart);
    this.dateEnd = new Date(json?.dateEnd);
    this.exams = json?.exams?.map((jsonExam) =>
      new CourseExam().withJSON(jsonExam)
    );
    return this;
  }
}
