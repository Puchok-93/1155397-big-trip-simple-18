import TripSort from '../view/trip-sort-view.js';
import TripList from '../view/trip-list-view.js';
import TripPoint from '../view/trip-point-view.js';
import TripEdit from '../view/trip-edit-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  tripListComponent = new TripList();
  init = (container) => {
    this.container = container;
    render(new TripSort(), this.container);
    render(this.tripListComponent, this.container);
    render(new TripEdit(), this.tripListComponent.getElement());

    for(let i = 0; i < 3; i++) {
      render(new TripPoint(), this.tripListComponent.getElement());
    }
  };
}