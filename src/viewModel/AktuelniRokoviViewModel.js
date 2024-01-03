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
  project = () => {
    return {
      aktuelniRokovi: this.aktuelniRokovi,
      mojiIspiti: this.mojiIspiti,
      sviIspiti: this.sviIspiti,
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
  ucitajMojeIspite = async (key) => {
    // try {
    //   const token = sessionStorage.auth_token;
    //   const response = axios.get(
    //     `${localhost}:8000/api/course-exams/${
    //       this.aktuelniRokovi[key].name
    //     }?indexNum=${indexNum}&passed=true`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   if (response.data.success === true) {
    //     const newPeriods = response.data.data.map((jsonExamPeriod) => {
    //       return new ExamPeriod().fromJSON(jsonExamPeriod);
    //     });
    //     this.aktuelniRokovi = newPeriods;
    //     this.updateView?.();
    //     console.log("rokovi postavljeni");
    //   } else {
    //     console.error(response.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // return undefined;
  };
  ucitajSveIspite = async (key) => {
    this.sviIspiti = this.aktuelniRokovi[key].exams;
    this.updateView?.();
  };
}
