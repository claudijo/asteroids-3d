export const createElement = (tagName, attributes = {}) => {
  const element = document.createElement(tagName);
  for (const key of Object.keys(attributes)) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}