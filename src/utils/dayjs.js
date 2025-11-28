import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const TARGET_TIMEZONE = "Etc/GMT+12";

dayjs.tz.setDefault(TARGET_TIMEZONE); 

export const dayjsUtc = (...args) => {
  const date = dayjs(...args).tz(TARGET_TIMEZONE);
  
  if (!date.isValid()) {
    // Return a proxy object that returns "-" for any method call
    return new Proxy({}, {
      get: () => () => "-"
    });
  }
  
  return date;
};

export default dayjs;