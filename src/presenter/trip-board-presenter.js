import SortView from '../view/sort-view.js';
import TripList from '../view/points-list-view.js';
import TripPoint from '../view/point-view.js';
import TripEdit from '../view/editor-view.js';
import EmptyPointList from '../view/empty-point-list-view.js';
import {render, replace} from '../framework/render.js';

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

    if(this.#tripPoints.length === 0) {
      render(new EmptyPointList, this.#tripEventContainer);
    } else {
      for(let i = 0; i < this.#tripPoints.length; i++) {
        this.#renderPoint(this.#tripPoints[i]);
      }
    }
  };

  #renderPoint = function (point) {
    const selectedOffers = this.#pointModel.getSelectedOffers(point);
    const offersByType = this.#pointModel.getCurrentOffersByType(point);
    const destination = this.#pointModel.getCurrentDestination(point);
    const pointComponent = new TripPoint(point, destination, selectedOffers);
    const editComponent = new TripEdit(point, this.#tripDestinations, offersByType);

    const replacePointToEditForm = () => {
      replace(editComponent, pointComponent);
    };

    const replaceEditFormToPoint = () => {
      replace(pointComponent, editComponent);
    };

    const onEscKeyDown = function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setOpenFormHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.setCloseFormHandler(() => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editComponent.setSubmitFormHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointComponent, this.#tripList.element);
  };
}
