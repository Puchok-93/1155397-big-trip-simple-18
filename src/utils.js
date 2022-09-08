import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Получение случайного элемента массива

const getRandomArrayElement = function(array) {
  return array[getRandomInteger(0, array.length - 1)];
};

// Форматируем дату
const formatDate = function(dueDate) {
  return dayjs(dueDate).format('MMM D');
};

// Форматируем время
const formatTime = function(dueDate) {
  return dayjs(dueDate).format('HH:mm');
};

// Форматируем дату и время
const formatFullDate = function(dueDate) {
  return dayjs(dueDate).format('DD/MM/YY HH:mm');
};

export {getRandomInteger, getRandomArrayElement, formatDate, formatTime, formatFullDate};
