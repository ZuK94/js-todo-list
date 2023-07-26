function setAttributes(element, attributes) {
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
}

const helper = {
  setAttributes,
};

export default helper;
