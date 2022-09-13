import SortView from '../view/sort-view.js';
import TripList from '../view/points-list-view.js';
import TripPoint from '../view/point-view.js';
import TripEdit from '../view/editor-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  #pointModel = null;
  #tripEventContainer = null;
  #tripList = new TripList();
  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];


  init = (tripEventContainer, pointModel) => {
    this.#pointModel = pointModel;
    this.#tripEventContainer = tripEventContainer;

    this.#tripPoints = [...this.#pointModel.points];
    this.#tripDestinations = [...this.#pointModel.destinations];
    this.#tripOffers = [...this.#pointModel.offersByType];

    render(new SortView(), this.#tripEventContainer);
    render(this.#tripList, this.#tripEventContainer);

    for(let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  };

  #renderPoint = function (point) {
    const selectedOffers = this.#pointModel.getSelectedOffers(point);
    const offersByType = this.#pointModel.getCurrentOffersByType(point);
    const destination = this.#pointModel.getCurrentDestination(point);
    const pointComponent = new TripPoint(point, destination, selectedOffers);
    const editComponent = new TripEdit(point, this.#tripDestinations, offersByType);

    const replacePointToEditForm = () => {
      this.#tripList.element.replaceChild(editComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#tripList.element.replaceChild(pointComponent.element, editComponent.element);
    };

    const onEscKeyDown = function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointComponent, this.#tripList.element);
  };
}
