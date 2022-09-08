import { generateRandomPoint , offersByType, destinations} from '../mock/point.js';

export default class PointModel {
  points = Array.from({length: 10}, generateRandomPoint);
  getPoints = () => this.points;

  getDestinations = () => destinations;
  getOffers = () => offersByType;

  getCurrentOffers = (point) => {
    this.currentOffers = offersByType.find((offer) => offer.type === point.type)
      .offers.filter((offer) => point.offers.includes(offer.id));
    return this.currentOffers;
  };

  getOffersByType = (point) => {
    this.offersByType = offersByType.find((offer) => offer.type === point.type);
    return this.offersByType;
  };

  getCurrentDestination = (point) => {
    this.currentDestination = destinations.find((destination) => (destination.id === point.destination));
    return this.currentDestination;
  };
}
