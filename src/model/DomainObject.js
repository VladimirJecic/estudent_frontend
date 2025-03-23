export default class DomainObject {
  fromJSON(json) {
    throw new Error(
      `Abstract method ${this.fromJSON.name} not implemented in class ${this.constructor.name}`
    );
  }
}
