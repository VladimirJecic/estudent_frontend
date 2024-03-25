export default class DomainObject {
  withJSON(json) {
    throw new Error(
      `Abstract method ${this.withJSON.name} not implemented in class ${this.constructor.name}`
    );
  }
}
