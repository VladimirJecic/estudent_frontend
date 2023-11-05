const toJSON = function () {
  const getProps = {};
  for (const prop in this) {
    if (prop.startsWith("get")) {
      let propName = prop.split("get")[1];
      propName = propName[0].toLowerCase() + propName.slice(1);
      getProps[propName] = this[prop]();
    }
  }
  return JSON.stringify(getProps);
};
const fromJSON = function (json) {
  const setters = {};

  // Create a setters object with the appropriate setter functions based on the structure of the object
  for (const prop in this) {
    if (typeof this[prop] === "function" && prop.startsWith("set")) {
      const propName = prop.split("set")[1].toLowerCase(); // Extract property name from setter function
      setters[propName] = this[prop]; // Assign the setter function to the respective property name
    }
  }

  // Apply properties from JSON to the object using the setter functions
  for (const propName in json) {
    if (json[propName] !== undefined && setters[propName]) {
      setters[propName](json[propName]);
    }
  }
  return this;
};

export { toJSON, fromJSON };
