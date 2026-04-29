import Dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const date = Dayjs();
const netxt5Days = date.subtract(30, 'Days');
const fullDate = netxt5Days.format('MMMM, dddd D');
    console.log(`30 DAYS B4 TODAY: ${fullDate}`);