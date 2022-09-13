import {createElement} from '../render.js';

const tripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripList {
  #element = null;

  get template() {
    return tripListTemplate();
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
