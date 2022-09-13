import { createElement } from '../render.js';

const emptyPointListTempalte = function() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyPointList {
  #element = null;

  get template() {
    return emptyPointListTempalte();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
