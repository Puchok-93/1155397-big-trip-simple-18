import FilterView from './view/filter-view';
import EventsPresenter from './presenter/trip-board-presenter';
import PointModel from './model/point-model.js';
import {render} from './framework/render.js';

// Header
const siteHeader = document.querySelector('.page-header');
const tripFilters = siteHeader.querySelector('.trip-controls__filters');


// Main

const siteMain = document.querySelector('.page-body__page-main');
const tripEvents = siteMain.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new EventsPresenter();

render(new FilterView(pointModel.points), tripFilters);
tripPresenter.init(tripEvents, pointModel);
