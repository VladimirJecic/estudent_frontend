import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
export default class PolozeniIspitiViewModel {
  #polozeniIspiti;
  #ucitavaSe;
  updateView;
  constructor() {
    this.#polozeniIspiti = [];
    this.#ucitavaSe = true;
    this.updateView = undefined;
  }
  project = () => {
    return {
      polozeniIspiti: this.#polozeniIspiti,
    };
  };

  ucitajPolozeneIspite = async () => {
    this.#ucitavaSe = true;
    this.#polozeniIspiti = [];
    const token = JSON.parse(sessionStorage.user).token;
    axios
      .get(`${localhost}:8081/api/exam-registrations/?excludeFailed=${true}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          this.#polozeniIspiti = response.data.data.examRegistrations.map(
            (jsonExamRegistration) =>
              new ExamRegistration().fromJSON(jsonExamRegistration)
          );
          this.updateView?.();
          console.info("polozeni ispiti ucitani");
        }
      })
      .catch((error) => {
        alert("Doslo je do greske prilikom obrade zahteva");
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSe = false;
      });
  };
  prosecnaOcena() {
    if (this.#polozeniIspiti.length <= 0) {
      return "Nema polozenih ispita";
    } else
      return (
        this.#polozeniIspiti.reduce((sum, prijava) => {
          return (sum += Number(prijava.mark));
        }, 0) / this.#polozeniIspiti.length
      );
  }

  ukupnoESPB() {
    return this.#polozeniIspiti.reduce((sum, uspesnoPolaganje) => {
      return (sum += Number(uspesnoPolaganje.courseExam.course.espb));
    }, 0);
  }
  vratiPoruku = () =>
    this.#ucitavaSe ? "učitava se..." : "Nema položenih ispita";
}
