import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
import CourseExam from "../model/CourseExam.js";
import LoginViewModel from "./LoginViewModel.js";
export default class PrijavaIspitaViewModel {
  potencijalnePrijave;
  postojecePrijave;
  successMessage;
  #ucitavaSePotencijalnePrijave;
  #ucitavaSePostojecePrijave;
  updateView;
  constructor() {
    this.potencijalnePrijave = [];
    this.postojecePrijave = [];
    this.successMessage = undefined;
    this.#ucitavaSePotencijalnePrijave = true;
    this.#ucitavaSePostojecePrijave = true;
    this.updateView = undefined;
  }
  project = () => {
    return {
      potencijalnePrijave: this.potencijalnePrijave,
      postojecePrijave: this.postojecePrijave,
      successMessage: this.successMessage,
    };
  };

  ucitajPotencijalnePrijave = async () => {
    this.#ucitavaSePotencijalnePrijave = true;
    this.potencijalnePrijave = [];
    const token = JSON.parse(sessionStorage.user).token;
    axios
      .get(`${localhost}:8000/api/course-exams/registable`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          const student = LoginViewModel.getStoredUser();
          this.potencijalnePrijave = response.data.data.courseExams.map(
            (jsonCourseExam) =>
              new ExamRegistration()
                .withCourseExam(new CourseExam().withJSON(jsonCourseExam))
                .withStudent(student)
          );

          this.updateView?.();
          console.log(response.data.message);
        } else {
          console.error(response.data);
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSePotencijalnePrijave = false;
      });
  };
  ucitajPostojecePrijave = async () => {
    this.#ucitavaSePostojecePrijave = true;
    this.postojecePrijave = [];
    const token = JSON.parse(sessionStorage.user).token;
    axios
      .get(`${localhost}:8000/api/exam-registrations/notGraded`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          const student = LoginViewModel.getStoredUser();
          this.potencijalnePrijave = response.data.data.courseExams.map(
            (jsonCourseExam) =>
              new ExamRegistration()
                .withCourseExam(new CourseExam().withJSON(jsonCourseExam))
                .withStudent(student)
          );

          this.updateView?.();
          console.log(response.data.message);
        } else {
          console.error(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.#ucitavaSePotencijalnePrijave = false;
      });
  };
  sacuvajPrijavu = async (key) => {
    const examRegistration = this.potencijalnePrijave[key];
    const data = JSON.stringify({
      course_id: examRegistration.courseExam.course.id,
      exam_period_id: examRegistration.courseExam.examPeriod.id,
      student_id: examRegistration.student.id,
    });
    const token = LoginViewModel.getStoredUser()?.token;
    const config = {
      method: "post",
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
        if (response.data.success === true) {
          console.log(response.data.message);
          this.successMessage = `Ispit ${examRegistration.courseExam.course.name} u roku ${examRegistration.courseExam.examPeriod.name} uspešno prijavljen!`;
          this.updateView?.();
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response === undefined) {
          console.error("No response from server");
        } else {
          alert(error);
        }
      });
  };
  obrisiPrijavu = () => {};
  hideWindow = () => {
    this.successMessage = undefined;
    this.updateView?.();
  };
  vratiPorukuPotencijalnePrijave = () =>
    this.#ucitavaSePotencijalnePrijave
      ? "učitava se..."
      : "Prijava ispita nije u toku";
  vratiPorukuPostojecePrijave = () =>
    this.#ucitavaSePostojecePrijave
      ? "učitava se..."
      : "Niste prijavili nijedan ispit!";
}
