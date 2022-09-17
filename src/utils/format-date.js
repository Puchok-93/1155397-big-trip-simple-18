import dayjs from 'dayjs';

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

export {formatDate, formatTime, formatFullDate};
