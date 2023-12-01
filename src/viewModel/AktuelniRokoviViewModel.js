import axios from "axios";
import { localhost } from "../assets/config.js";
import { useRef, useState } from "react";
import ExamPeriod from "../model/ExamPeriod.js";
// import CourseExam from "../model/CourseExam.js";
const AktuelniRokoviViewModel = () => {
  const [aktuelniRokovi, setAktuelniRokovi] = useState([]);
  // const [mojiIspiti, setMojiIspiti] = useState([]);
  // const [sviIspiti, setSviIspiti] = useState([]);
  async function ucitajAktuelneRokove() {
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
        setAktuelniRokovi(newPeriods);
        console.log("rokovi postavljeni");
        return newPeriods;
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
  async function ucitajMojeIspite() {}
  async function ucitajSveIspite() {}

  return {
    aktuelniRokovi,
    setAktuelniRokovi: (rokovi) => setAktuelniRokovi(rokovi),
    ucitajAktuelneRokove,
    ucitajMojeIspite,
    ucitajSveIspite,
  };
};
export default AktuelniRokoviViewModel;
