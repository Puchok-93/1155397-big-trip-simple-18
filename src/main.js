import FilterView from './view/filter-view';
import BoardPointsPresenter from './presenter/trip-board-presenter';
import PointModel from './model/point-model.js';
import {render} from './framework/render.js';

// Header
const siteHeader = document.querySelector('.page-header');
const tripFilters = siteHeader.querySelector('.trip-controls__filters');


// Main

const siteMain = document.querySelector('.page-body__page-main');
const tripEvents = siteMain.querySelector('.trip-events');

const pointsModel = new PointModel();
const tripPointPresenter = new BoardPointsPresenter(tripEvents, pointsModel);

render(new FilterView(pointsModel.points), tripFilters);
tripPointPresenter.init();
