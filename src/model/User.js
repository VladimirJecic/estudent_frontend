import DomainObject from "./DomainObject";

export default class User extends DomainObject {
  name;
  indexNum;
  password;
  confirmPassword;
  email;
  role;
  token;

  constructor() {
    super();
    this.id = -1;
    this.name = "";
    this.indexNum = "";
    this.password = "";
    this.confirmPassword = "";
    this.email = "";
    this.role = "student";
    this.token = "";
  }
  fromJSON(json) {
    this.id = json?.id;
    this.name = json?.name;
    this.indexNum = json?.indexNum;
    this.password = json?.password;
    this.confirmPassword = json?.confirmPassword;
    this.email = json?.email;
    this.role = json?.role;
    this.token = json?.token;
    return this;
  }
  toString() {
    return this.name + " (" + this.indexNum + ")";
  }

  isAdmin() {
    return this.role === "admin";
  }
  isAuthenticated = () => {
    return this.token !== "";
  };
}
