import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamPeriod from "../model/ExamPeriod.js";
import CourseExam from "../model/CourseExam.js";

export default class AktuelniRokoviViewModel {
  #aktuelniRokovi;
  #mojiIspiti;
  #sviIspiti;
  #imeTrazenogRoka;
  #ucitavaSe;

  updateView;
  constructor() {
    this.#aktuelniRokovi = [];
    this.#mojiIspiti = [];
    this.#sviIspiti = [];
    this.#ucitavaSe = true;
    this.#imeTrazenogRoka = "";
    this.updateView = undefined;
  }
  project = () => {
    return {
      aktuelniRokovi: this.#aktuelniRokovi,
      mojiIspiti: this.#mojiIspiti,
      sviIspiti: this.#sviIspiti,
      porukaUcitavanja: this.porukaUcitavanja,
      imeTrazenogRoka: this.#imeTrazenogRoka,
    };
  };

  ucitajAktuelneRokove = async () => {
    this.#ucitavaSe = true;
    const token = JSON.parse(sessionStorage.user).token;
    axios
      .get(`${localhost}:8081/api/exam-periods?onlyActive=${true}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.success === true) {
          this.#aktuelniRokovi = response.data.data.map((jsonExamPeriod) => {
            return new ExamPeriod().fromJSON(jsonExamPeriod);
          });
          this.updateView?.();
        }
      })
      .catch((error) => {
        alert("Doslo je do greske prilikom obrade zahteva");
        console.error(error);
      })
      .finally(() => (this.#ucitavaSe = false));
  };
  ucitajMojeIspite = async (key) => {
    this.#sviIspiti = [];
    this.#mojiIspiti = [];
    this.#imeTrazenogRoka = this.#aktuelniRokovi[key].name;
    try {
      const token = JSON.parse(sessionStorage.user).token;
      const response = await axios.get(
        `${localhost}:8081/api/course-exams/${this.#imeTrazenogRoka}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      if (response.data.success === true) {
        this.#mojiIspiti = response.data.data.courseExams.map((jsonExam) =>
          new CourseExam().fromJSON(jsonExam)
        );
        this.updateView?.();
      } else {
        console.error(response.data.data);
      }
    } catch (error) {
      alert("Doslo je do greske prilikom obrade zahteva");
      console.error(error);
    }
    return undefined;
  };
  ucitajSveIspite = async (key) => {
    this.#mojiIspiti = [];
    this.#sviIspiti = this.#aktuelniRokovi[key].exams;
    this.#imeTrazenogRoka = this.#aktuelniRokovi[key].name;
    this.updateView?.();
  };
  vratiPoruku = () =>
    this.#ucitavaSe ? "učitava se..." : "Nema aktuelnih rokova";
}
