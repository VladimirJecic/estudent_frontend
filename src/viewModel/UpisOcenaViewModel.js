import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
import LoginViewModel from "./LoginViewModel.js";
export default class UpisOcenaViewModel {
  #neocenjenaPolaganja;
  #ucitavaSe;
  #successMessage;
  updateView;
  constructor() {
    this.#neocenjenaPolaganja = [];
    this.#ucitavaSe = true;
    this.#successMessage = undefined;
    this.updateView = undefined;
  }
  project = () => {
    return {
      neocenjenaPolaganja: this.#neocenjenaPolaganja,
      successMessage: this.#successMessage,
    };
  };
  changePolaganje = (event, key) => {
    const polaganje = this.#neocenjenaPolaganja[key];
    switch (event.target.name) {
      case "mark":
        polaganje.mark = event.target.value;
        break;
      case "comment":
        polaganje.comment = event.target.value;
        break;
      default:
        console.error("Unexpected target.name in changePolaganje");
        return;
    }
    this.updateView?.();
  };
  ucitajNeocenjenaPolaganja = async () => {
    this.#ucitavaSe = true;
    this.#neocenjenaPolaganja = [];
    const token = JSON.parse(sessionStorage.user).token;
    axios
      .get(`${localhost}:8000/api/exam-registrations/forGrading`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          this.#neocenjenaPolaganja = response.data.data.examRegistrations.map(
            (jsonExamRegistration) =>
              new ExamRegistration().withJSON(jsonExamRegistration)
          );
          this.updateView?.();
          console.info("neocenjena polaganja ucitana");
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        alert(error.response.data.data);
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSe = false;
      });
  };
  sacuvajPrijavu = async (key) => {
    const examRegistration = this.potencijalnePrijave[key];
    const data = JSON.stringify({
      course_id: examRegistration.courseExam.course.id,
      exam_period_id: examRegistration.courseExam.examPeriod.id,
      student_id: examRegistration.student.id,
      mark: examRegistration.mark,
      signed_by_id: examRegistration.signed_by_id,
    });
    const token = LoginViewModel.getStoredUser()?.token;
    const config = {
      method: "put",
      url: "http://localhost:8000/api/exam-registrations",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          this.#successMessage = `Izmene sačuvane!`;
          this.updateView();
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response === undefined) {
          console.error("No response from server");
        } else {
          alert(error.response.data.data);
        }
      });
  };
  hideWindow = () => {
    this.#successMessage = undefined;
    this.updateView?.();
  };
  vratiPoruku = () =>
    this.#ucitavaSe ? "učitava se..." : " Nema neocenjenih polaganja";
}
