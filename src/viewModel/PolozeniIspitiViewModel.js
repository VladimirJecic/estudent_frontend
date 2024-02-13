import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
export default class PolozeniIspitiViewModel {
  polozeniIspiti;
  updateView;
  constructor() {
    this.polozeniIspiti = [];
    this.updateView = undefined;
  }
  project = () => {
    return {
      polozeniIspiti: this.polozeniIspiti,
    };
  };

  ucitajPolozeneIspite = async () => {
    try {
      this.polozeniIspiti = [];
      const token = JSON.parse(sessionStorage.user).token;
      const response = await axios.get(
        `${localhost}:8000/api/exam-registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        this.polozeniIspiti =
          response.data.data.successfulExamRegistrations.map(
            (jsonExamRegistration) =>
              new ExamRegistration().withJSON(jsonExamRegistration)
          );
        this.updateView?.();
        console.info("polozeni ispiti ucitani");
      } else {
        console.debug(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };
  prosecnaOcena() {
    if (this.polozeniIspiti.length <= 0) {
      return "Nema polozenih ispita";
    } else
      return (
        this.polozeniIspiti.reduce((sum, prijava) => {
          return (sum += Number(prijava.mark));
        }, 0) / this.polozeniIspiti.length
      );
  }

  ukupnoESPB() {
    return this.polozeniIspiti.reduce((sum, prijava) => {
      return (sum += Number(prijava.courseExam.course.espb));
    }, 0);
  }
}
