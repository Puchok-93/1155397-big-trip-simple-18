import { generateRandomPoint , offersByType, destinations} from '../mock/point.js';

export default class PointModel {
  #points = Array.from({length: 10}, generateRandomPoint );
  #destinations = destinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }

  get offersByType () {
    return this.#offersByType;
  }

  getSelectedOffers = function (point) {
    const selectedOffers = this.#offersByType.find((offer) => offer.type === point.type).offers.filter((offer) => point.offers.includes(offer.id));
    return selectedOffers;
  };

  getCurrentOffersByType = function (point) {
    const currentOffersByType = this.#offersByType.find((offer) => offer.type === point.type);
    return currentOffersByType;
  };

  getCurrentDestination = function (point) {
    this.currentDestination = destinations.find((destination) => (destination.id === point.destination));
    return this.currentDestination;
  };
}
