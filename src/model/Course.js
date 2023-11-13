import User from "./User.js";

export default class CreateCourse {
  name;
  semester;
  espb;
  participants;
  constructor() {
    this.name = "";
    this.semester = "";
    this.espb = 0;
    this.participants = [];
  }

  fromJSON(json) {
    this.name = json.name;
    this.semester = json.semester;
    this.espb = json.espb;
    this.participants = json.participants.map((jsonParticipant) =>
      new User().fromJSON(jsonParticipant)
    );
    return this;
  }
}
