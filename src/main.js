import TripFilter from './view/filter-view';
import TripPresenter from './presenter/trip-board-presenter';
import PointModel from './model/point-model.js';
import {render} from './render.js';

// Header
const siteHeader = document.querySelector('.page-header');
const tripFilters = siteHeader.querySelector('.trip-controls__filters');


// Main

const siteMain = document.querySelector('.page-body__page-main');
const tripEvents = siteMain.querySelector('.trip-events');

const pointsModel = new PointModel();
const tripPresenter = new TripPresenter();

render(new TripFilter(), tripFilters);
tripPresenter.init(tripEvents, pointsModel);
