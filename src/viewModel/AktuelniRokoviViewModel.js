import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamPeriod from "../model/ExamPeriod.js";
import CourseExam from "../model/CourseExam.js";
// import CourseExam from "../model/CourseExam.js";
export default class AktuelniRokoviViewModel {
  aktuelniRokovi;
  mojiIspiti;
  sviIspiti;
  imeTrazenogRoka;
  updateView;
  constructor() {
    this.aktuelniRokovi = [];
    this.mojiIspiti = [];
    this.sviIspiti = [];
    this.imeTrazenogRoka = "";
    this.updateView = undefined;
  }
  project = () => {
    return {
      aktuelniRokovi: this.aktuelniRokovi,
      mojiIspiti: this.mojiIspiti,
      sviIspiti: this.sviIspiti,
      imeTrazenogRoka: this.imeTrazenogRoka,
    };
  };

  ucitajAktuelneRokove = async () => {
    try {
      const token = JSON.parse(sessionStorage.user).token;
      const response = await axios.get(
        `${localhost}:8000/api/exam-periods?onlyActive=${true}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        this.aktuelniRokovi = response.data.data.map((jsonExamPeriod) => {
          return new ExamPeriod().withJSON(jsonExamPeriod);
        });
        this.updateView?.();
        console.log("rokovi postavljeni");
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };
  ucitajMojeIspite = async (key) => {
    this.sviIspiti = [];
    this.mojiIspiti = [];
    this.imeTrazenogRoka = this.aktuelniRokovi[key].name;
    try {
      const token = JSON.parse(sessionStorage.user).token;
      const response = await axios.get(
        `${localhost}:8000/api/course-exams/?examPeriod=${this.imeTrazenogRoka}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        this.mojiIspiti = response.data.data.courseExams.map((jsonExam) =>
          new CourseExam().withJSON(jsonExam)
        );
        this.updateView?.();
        console.log(response.data.message);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };
  ucitajSveIspite = async (key) => {
    this.mojiIspiti = [];
    this.sviIspiti = this.aktuelniRokovi[key].exams;
    this.imeTrazenogRoka = this.aktuelniRokovi[key].name;
    this.updateView?.();
  };
}
