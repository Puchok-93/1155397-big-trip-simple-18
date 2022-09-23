import { TYPES, DESCRIPTIONS } from '../const.js';
import { getRandomInteger, getRandomArrayElement } from '../utils/utils.js';
import { nanoid } from 'nanoid';

// Получаем случайный тип

const getRandomType = function() {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

// Получаем случайное описание

const getRandomDescription = function() {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomIndex];
};

// Получаем случайное количество изображений
const getRandomPhoto = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 20)}`,
  description: 'In rutrum ac purus sit amet tempus'
});

export const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Upgrade',
        price: 220,
      },
      {
        id: 3,
        title: 'Upgrade+',
        price: 320,
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 20,
      },
      {
        id: 2,
        title: 'Upgrade',
        price: 50,
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 200,
      },
      {
        id: 2,
        title: 'Upgrade',
        price: 600,
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade',
        price: 45,
      },
      {
        id: 2,
        title: 'Upgrade+',
        price: 50,
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade+',
        price: 60,
      },
      {
        id: 2,
        title: 'Upgrade to business class',
        price: 500,
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 300,
      },
      {
        id: 2,
        title: 'Upgrade',
        price: 100,
      },
      {
        id: 3,
        title: 'Upgrade+',
        price: 150,
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 20,
      },
      {
        id: 2,
        title: 'Upgrade',
        price: 50,
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Upgrade',
        price: 15,
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Upgrade',
        price: 60,
      },
      {
        id: 2,
        title: 'Upgrade+',
        price: 150,
      }
    ]
  }
];

export const destinations = [
  {
    id: 1,
    description: getRandomDescription(),
    name: 'London',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 2,
    description: getRandomDescription(),
    name: 'Paris',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 3,
    description: getRandomDescription(),
    name: 'Madrid',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 1,
    description: getRandomDescription(),
    name: 'Rome',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 4,
    description: getRandomDescription(),
    name: 'Liverpool',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 5,
    description: getRandomDescription(),
    name: 'Amsterdam',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
  {
    id: 6,
    description: getRandomDescription(),
    name: 'Barcelona',
    pictures: [getRandomPhoto(), getRandomPhoto(), getRandomPhoto(), getRandomPhoto()],
  },
];

// Получаем случайный id оффер

const getRandomOffersIds = function (type) {
  const randomIds = [];
  const currentOffers = offersByType.find((offer) => offer.type === type);
  const randomLength = getRandomInteger(0, currentOffers.offers.length);
  if (randomLength === 0) {
    return randomIds;
  }
  for (let i = 0; i < randomLength; i++) {
    randomIds.push(currentOffers.offers[i].id);
  }
  return randomIds;
};

export const generateRandomPoint = function() {
  const type = getRandomType();
  const destination = getRandomArrayElement(destinations);

  return ({
    id: nanoid(),
    type: type,
    basePrice: getRandomInteger(100, 1000),
    dateFrom: `2019-07-${getRandomInteger(10, 14)}T22:${getRandomInteger(30, 55)}:56.845Z`,
    dateTo: `2019-07-${14, 20}T11:${getRandomInteger(30, 55)}:13.375Z`,
    destination: destination.id,
    offers: getRandomOffersIds(type),
  });
};
