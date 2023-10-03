import moment from 'moment';

export const getCurrentTime = (timeFormat) => {
  return moment().format(timeFormat);
};