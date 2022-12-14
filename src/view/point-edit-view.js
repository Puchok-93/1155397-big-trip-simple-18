import { TYPES } from '../const.js';
import { formatFullDate } from '../utils/format-date.js';
import AbstractView from '../framework/view/abstract-view';

const createInputsType = function(currentType) {
  const typesList = TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>`).join('');

  return (
    `<label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${typesList}
      </fieldset>
    </div>`);
};

const creeateDestinationTemplate = function(description , allDestinations, type) {
  const destinationsOptions = allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

  return (
    `<label class="event__label  event__type-output" for="event-destination-1">
      ${type.charAt(0).toUpperCase() + type.slice(1)}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${description.name}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinationsOptions}
    </datalist>`);
};

const createDateTemplate = function(dateFrom, dateTo) {
  return (
    ` <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatFullDate(dateFrom)}">
        &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatFullDate(dateTo)}">`);
};

const createPriceTemplate = function (price) {
  return (
    `<label class="event__label" for="event-price-1">
       <span class="visually-hidden">${price}</span>
       &euro;
     </label>
     <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">`
  );
};

const createOffersTemplate = function(currentOffers, offersByType) {
  const availabelOffers = offersByType.offers.map((offer) => `
  <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
      id="event-offer-${offer.title.toLowerCase()}-1" type="checkbox" 
      name="event-offer-${offer.title.toLowerCase()}" ${currentOffers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `).join('');

  return availabelOffers;
};

const createEditFormTempalte = function(point, allDestinations, offersByType) {
  const { basePrice, dateFrom, dateTo, destination, type, offers } = point;
  const tripDestination = allDestinations.find((pointDestination) => (pointDestination.id === destination));

  return (
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        ${createInputsType(type)}
      </div>

      <div class="event__field-group  event__field-group--destination">
        ${creeateDestinationTemplate(tripDestination, allDestinations, type)}
      </div>

      <div class="event__field-group  event__field-group--time">
        ${createDateTemplate(dateFrom, dateTo)}
      </div>

      <div class="event__field-group  event__field-group--price">
        ${createPriceTemplate(basePrice)}
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offers, offersByType)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${tripDestination.description}</p>
      </section>
    </section>
  </form>
    `
  );
};


export default class PointEditView extends AbstractView {
  #point = null;
  #destinations = null;
  #offersByType = null;

  constructor(point, destinations, offersByType) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;
  }

  get template() {
    return createEditFormTempalte(this.#point, this.#destinations, this.#offersByType);
  }

  setCloseFormHandler = (callback) => {
    this._callback.closeForm = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
  };

  setSubmitFormHandler = (callback) => {
    this._callback.submitForm = callback;
    this.element.addEventListener('submit', this.#submitFormHandler);
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeForm();
  };

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitForm();
  };
}
