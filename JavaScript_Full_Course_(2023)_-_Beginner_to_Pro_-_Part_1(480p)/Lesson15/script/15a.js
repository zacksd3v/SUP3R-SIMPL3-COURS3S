import Dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const date = Dayjs();
const netxt5Days = date.add(5, 'Days');
const fullDate = netxt5Days.format('MMMM, dddd D');
    console.log(`7 DAYS FROM TODAY: ${fullDate}`);