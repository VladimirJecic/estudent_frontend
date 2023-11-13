export default class User {
  name;
  indexNum;
  password;
  confirmPassword;
  email;
  role;
  token;

  constructor() {
    this.name = "";
    this.indexNum = "";
    this.password = "";
    this.confirmPassword = "";
    this.email = "";
    this.role = "student";
    this.token = "";
  }

  fromJSON(json) {
    this.name = json.name;
    this.indexNum = json.indexNum;
    this.password = json.password;
    this.confirmPassword = json.confirmPassword;
    this.email = json.email;
    this.role = json.role;
    this.token = json.token;
    return this;
  }
}
