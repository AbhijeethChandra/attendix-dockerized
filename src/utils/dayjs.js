import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default (...args) => dayjs.utc(...args);