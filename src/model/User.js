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

  withJSON(json) {
    this.name = json?.name ?? this.name;
    this.indexNum = json?.indexNum ?? this.indexNum;
    this.password = json?.password ?? this.password;
    this.confirmPassword = json?.confirmPassword ?? this.password;
    this.email = json?.email ?? this.email;
    this.role = json?.role ?? this.role;
    this.token = json?.token ?? this.token;
    return this;
  }
  toString() {
    return this.name + " (" + this.indexNum + ")";
  }
}
