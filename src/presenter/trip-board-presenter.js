import TripEdit from '../view/editor-view.js';
import TripSort from '../view/sort-view.js';
import TripList from '../view/points-list-view.js';
import TripPoint from '../view/point-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  tripListComponent = new TripList();

  init = (container, pointModel) => {
    this.container = container;
    this.pointModel = pointModel;
    this.tripPoints = [...pointModel.getPoints()];
    this.tripDestinations = [...pointModel.getDestinations()];
    this.tripOffers = [...pointModel.getOffers()];


    render(new TripSort(), this.container);
    render(this.tripListComponent, this.container);
    const currentOffersByType = this.pointModel.getOffersByType(this.tripPoints[0]);
    render(new TripEdit(this.tripPoints[0], this.tripDestinations, currentOffersByType) ,this.tripListComponent.getElement());

    for(let i = 0; i < this.tripPoints.length; i++) {
      const offers = this.pointModel.getCurrentOffers(this.tripPoints[i]);
      const destination = this.pointModel.getCurrentDestination(this.tripPoints[i]);
      render(new TripPoint(this.tripPoints[i], destination, offers), this.tripListComponent.getElement());
    }
  };
}
