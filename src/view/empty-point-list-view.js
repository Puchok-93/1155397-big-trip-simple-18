import AbstractView from '../framework/view/abstract-view.js';

const emptyPointListTempalte = function() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyPointList extends AbstractView {
  get template() {
    return emptyPointListTempalte();
  }
}
