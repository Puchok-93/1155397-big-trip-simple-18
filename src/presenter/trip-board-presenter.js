import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';

import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import EmptyPointList from '../view/empty-point-list-view.js';

import PointPresenter from './point-presenter.js';


export default class BoardPointsPresenter {

  #pointsContainer = null;
  #pointModel = null;

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #emptyPointsListComponent = new EmptyPointList();


  #tripPoints = [];
  #pointPresenter = new Map();

  constructor(pointsContainer, pointModel) {
    this.#pointsContainer = pointsContainer;
    this.#pointModel = pointModel;
  }

  init = function() {
    this.#tripPoints = [...this.#pointModel.points];
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleChangeMode = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#pointsContainer, RenderPosition.BEFOREEND);
    this.#tripPoints.forEach((tripPoint) => this.#renderPoint(tripPoint));
  };

  #renderEmptyPointsList = () => {
    render(this.#emptyPointsListComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = function(point) {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handleChangeMode);
    pointPresenter.init(point, this.#pointModel);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = function() {
    if(this.#tripPoints.length === 0) {
      this.#renderEmptyPointsList();
    } else {
      this.#renderSort();
      this.#renderPointsList();
    }
  };
}
