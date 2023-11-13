import axios from "axios";
import { localhost } from "../assets/config.js";
import { useState } from "react";
import ExamPeriod from "../model/ExamPeriod.js";
const AktuelniRokoviViewModel = () => {
  const [aktuelniRokovi, setAktuelniRokovi] = useState([new ExamPeriod()]);

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
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    aktuelniRokovi,
    ucitajAktuelneRokove,
  };
};
export default AktuelniRokoviViewModel;
