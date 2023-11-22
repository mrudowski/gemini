export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const resolveWhen = (when: boolean | undefined) => when === undefined || when;

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * The value is no lower than min (or the next integer greater than
 * min if min isn't an integer), and is less than (but not equal to) max.
 */
export const getRandomInt = (min, max) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min)) + _min;
};

const format = number => {
  if (number < 10) {
    return '0' + number;
  } else {
    return '' + number;
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  return `${format(date.getDate())}.${format(date.getMonth() + 1)}.${date.getFullYear()} ${format(
    date.getHours()
  )}:${format(date.getMinutes())}:${format(date.getSeconds())}`;
};
