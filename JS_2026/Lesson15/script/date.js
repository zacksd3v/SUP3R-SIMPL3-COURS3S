import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function getFutureDate(days, format = 'MMM, dddd D') {
    return dayjs().add(days, 'day').format(format);
}

export function getPastDate(days, format = 'MMMM, dddd D') {
  return dayjs().subtract(days, 'day').format(format);
}

export function dayOfWeek(format) {
    return dayjs().format(format);
}


export const isWeekEnd = () => {
    const today = dayjs();
    return [0, 6].includes(today.day())
    ? today.format('dddd')
    : '!WEEK-END'
};