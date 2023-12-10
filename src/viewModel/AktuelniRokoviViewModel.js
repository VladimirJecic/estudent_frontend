import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamPeriod from "../model/ExamPeriod.js";
// import CourseExam from "../model/CourseExam.js";
export default class AktuelniRokoviViewModel {
  aktuelniRokovi;
  mojiIspiti;
  sviIspiti;
  updateView;
  constructor() {
    this.aktuelniRokovi = [];
    this.mojiIspiti = [];
    this.sviIspiti = [];
    this.updateView = undefined;
  }
  copy = () => {
    const copyOfThis = new AktuelniRokoviViewModel();
    copyOfThis.aktuelniRokovi = this.aktuelniRokovi;
    copyOfThis.updateView = this.updateView;
    return copyOfThis;
  };

  ucitajAktuelneRokove = async () => {
    try {
      const token = sessionStorage.auth_token;
      const response = await axios.get(
        `${localhost}:8000/api/exam-periods-active`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        const newPeriods = response.data.data.map((jsonExamPeriod) => {
          return new ExamPeriod().fromJSON(jsonExamPeriod);
        });
        this.aktuelniRokovi = newPeriods;
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
  ucitajMojeIspite = async () => {};
  ucitajSveIspite = async () => {};
}
