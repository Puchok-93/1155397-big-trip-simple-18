import TripFilter from './view/trip-filter-view';
import TripPresenter from './presenter/trip-board-presenter';
import {render} from './render.js';

// Header
const siteHeader = document.querySelector('.page-header');
const tripFilters = siteHeader.querySelector('.trip-controls__filters');


// Main

const siteMain = document.querySelector('.page-main');
const tripEvents = siteMain.querySelector('.trip-events');

const tripPresenter = new TripPresenter();
render(new TripFilter(), tripFilters);
tripPresenter.init(tripEvents);
