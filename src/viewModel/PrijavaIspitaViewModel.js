import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
import CourseExam from "../model/CourseExam.js";
import LoginViewModel from "./LoginViewModel.js";
export default class PrijavaIspitaViewModel {
  #potencijalnePrijave;
  #postojecePrijave;
  #ucitavaSePotencijalnePrijave;
  #ucitavaSePostojecePrijave;
  #successMessage;
  updateView;
  constructor() {
    this.#potencijalnePrijave = [];
    this.#postojecePrijave = [];
    this.#ucitavaSePotencijalnePrijave = true;
    this.#ucitavaSePostojecePrijave = true;
    this.#successMessage = undefined;
    this.updateView = undefined;
  }
  project = () => {
    return {
      potencijalnePrijave: this.#potencijalnePrijave,
      postojecePrijave: this.#postojecePrijave,
      successMessage: this.#successMessage,
    };
  };
  setupView = async () => {
    Promise.allSettled([
      this.ucitajPostojecePrijave(),
      this.ucitajPotencijalnePrijave(),
    ]).finally(() => {
      this.updateView?.();
    });
  };
  ucitajPotencijalnePrijave = async () => {
    this.#ucitavaSePotencijalnePrijave = true;
    this.#potencijalnePrijave = [];
    const token = JSON.parse(sessionStorage.user).token;
    return axios
      .get(`${localhost}:8081/api/course-exams/registable`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.success === true) {
          const student = LoginViewModel.getStoredUser();
          this.#potencijalnePrijave = response.data.data.courseExams.map(
            (jsonCourseExam) =>
              new ExamRegistration()
                .withCourseExam(new CourseExam().fromJSON(jsonCourseExam))
                .withStudent(student)
          );
        }
      })
      .catch((error) => {
        alert("Doslo je do greske prilikom obrade zahteva");
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSePotencijalnePrijave = false;
      });
  };
  ucitajPostojecePrijave = async () => {
    this.#ucitavaSePostojecePrijave = true;
    this.#postojecePrijave = [];
    const token = JSON.parse(sessionStorage.user).token;
    return axios
      .get(`${localhost}:8081/api/exam-registrations/notGraded`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          this.#postojecePrijave = response.data.data.examRegistrations.map(
            (jsonExamRegistration) =>
              new ExamRegistration().fromJSON(jsonExamRegistration)
          );
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSePostojecePrijave = false;
      });
  };
  sacuvajPrijavu = async (key) => {
    const examRegistration = this.#potencijalnePrijave[key];
    const data = JSON.stringify({
      course_id: examRegistration.courseExam.course.id,
      exam_period_id: examRegistration.courseExam.examPeriod.id,
      student_id: examRegistration.student.id,
    });
    const token = LoginViewModel.getStoredUser()?.token;
    const config = {
      method: "post",
      url: "http://localhost:8081/api/exam-registrations",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data.success === true) {
          this.#successMessage = `Ispit ${examRegistration.courseExam.course.name} u roku ${examRegistration.courseExam.examPeriod.name} je uspešno prijavljen!`;
          this.setupView();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response === undefined) {
          console.error("No response from server");
        } else {
          alert("Doslo je do greske prilikom obrade zahteva");
        }
      });
  };
  obrisiPrijavu = async (key) => {
    const examRegistration = this.#postojecePrijave[key];
    const data = JSON.stringify({
      course_id: examRegistration.courseExam.course.id,
      exam_period_id: examRegistration.courseExam.examPeriod.id,
      student_id: examRegistration.student.id,
    });
    const token = LoginViewModel.getStoredUser()?.token;
    const config = {
      method: "delete",
      url: "http://localhost:8081/api/exam-registrations",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 204) {
          this.setupView();
        } else {
          console.error(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response === undefined) {
          console.error("No response from server");
        } else {
          alert("Doslo je do greske prilikom obrade zahteva");
        }
      });
  };
  hideWindow = () => {
    this.#successMessage = undefined;
    this.updateView?.();
  };
  vratiPorukuPotencijalnePrijave = () =>
    this.#ucitavaSePotencijalnePrijave
      ? "učitava se..."
      : "Prijava ispita nije u toku";
  vratiPorukuPostojecePrijave = () =>
    this.#ucitavaSePostojecePrijave
      ? "učitava se..."
      : "Niste prijavili nijedan ispit";
}
