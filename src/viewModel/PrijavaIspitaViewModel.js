import axios from "axios";
import { localhost } from "../assets/config.js";
import ExamRegistration from "../model/ExamRegistration.js";
import CourseExam from "../model/CourseExam.js";
export default class PrijavaIspitaViewModel {
  potencijalnePrijave;
  postojecePrijave;
  updateView;
  constructor() {
    this.potencijalnePrijave = [];
    this.postojecePrijave = [];
    this.updateView = undefined;
  }
  project = () => {
    return {
      potencijalnePrijave: this.potencijalnePrijave,
      postojecePrijave: this.postojecePrijave,
    };
  };

  ucitajPotencijalnePrijave = async (key) => {
    this.postojecePrijave = [];
    try {
      const token = JSON.parse(sessionStorage.user).token;
      const response = await axios.get(
        `${localhost}:8000/api/course-exams/registable`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        this.potencijalnePrijave = response.data.data.courseExams.map(
          (jsonCourseExam) =>
            new ExamRegistration().withCourseExam(
              new CourseExam().withJSON(jsonCourseExam)
            )
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

  //     try {
  //       const token = JSON.parse(sessionStorage.user).token;
  //       const response = await axios.get(
  //         `${localhost}:8000/api/exam-registrations`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (response.data.success === true) {
  //         this.polozeniIspiti =
  //           response.data.data.successfulExamRegistrations.map(
  //             (jsonExamRegistration) =>
  //               new ExamRegistration().withJSON(jsonExamRegistration)
  //           );
  //         this.updateView?.();
  //         console.info("polozeni ispiti ucitani");
  //       } else {
  //         console.debug(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     return undefined;
  //   };
}
