import User from "./User.js";
import DomainObject from "./DomainObject.js";

export default class CreateCourse extends DomainObject {
  name;
  semester;
  espb;
  participants;
  constructor() {
    super();
    this.id = -1;
    this.name = "";
    this.semester = "";
    this.espb = 0;
    this.participants = [];
  }
  fromJSON(json) {
    this.id = json?.id;
    this.name = json?.name;
    this.semester = json?.semester;
    this.espb = json?.espb;
    this.participants = json?.participants?.map((jsonParticipant) =>
      new User().fromJSON(jsonParticipant)
    );
    return this;
  }
}
