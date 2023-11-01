import axios from "axios";
class EStudentViewModel {
  constructor() {
    this.localhost = "http://127.0.0.1";
    this.rokovi = [];
  }
  getRokovi = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${this.localhost}:8000/api/exam-periods-active`
      );
      if (response.data.success === true) {
        console.log(response.data);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
export default EStudentViewModel;
