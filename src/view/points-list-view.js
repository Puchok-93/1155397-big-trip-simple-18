import {createElement} from '../render.js';

const tripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripList {
  getTemplate() {
    return tripListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
