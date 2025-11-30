import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const TARGET_TIMEZONE = "Etc/GMT+0";
dayjs.tz.setDefault(TARGET_TIMEZONE);

const fallbackDate = {
  format: () => "-",
  toString: () => "-",
  valueOf: () => NaN,
  isValid: () => false,
};

const date = (input, ...rest) => {
  if (input === null || input === undefined) {
    return fallbackDate;
  }

  const raw = typeof input === "string" ? input : "";

  const isUTC =
    raw.endsWith("Z") ||
    raw.includes("+00:00") ||
    raw.includes("+0000") ||
    raw.includes("+00.00");

  const base = isUTC
    ? dayjs(input, ...rest)
        .utc()
        .tz(TARGET_TIMEZONE)
    : dayjs(input, ...rest);

  if (!base.isValid()) return fallbackDate;

  return base;
};

// only use this if expecting a UTC date input, otherwise use the main date function. This function might return "-" for invalid dates.
// if you are using this function on date input fields, it might throw invalid date errors for empty inputs.
export default date;
