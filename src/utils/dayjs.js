import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const TARGET_TIMEZONE = "Etc/GMT+12";
dayjs.tz.setDefault(TARGET_TIMEZONE);

const fallback = new Proxy(
  {},
  {
    get: () => () => "-",
  }
);

const date = (input, ...rest) => {
  const raw = typeof input === "string" ? input : "";

  const isUTC =
    raw.endsWith("Z") ||
    raw.includes("+00:00") ||
    raw.includes("+0000") ||
    raw.includes("+00.00");

  const base = isUTC
    ? dayjs(input, ...rest).utc().tz(TARGET_TIMEZONE)
    : dayjs(input, ...rest);

  if (!base.isValid()) return fallback;

  return base;
};

export default date;
