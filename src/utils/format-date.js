export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function formatLocalDateTime(timestamp) {
  if (!timestamp || typeof timestamp !== "string") {
    return formatDateTime(timestamp);
  }

  const dateTimeRegex = /(....-..-..)T(..:..:..)(.*)/; //probably a better way to write this
  const launchLocalDateTimeParts = dateTimeRegex.exec(timestamp);
  const launchLocalDateTimePartsInvalid = launchLocalDateTimeParts && launchLocalDateTimeParts.length !== 4
  if (!launchLocalDateTimeParts || launchLocalDateTimePartsInvalid) {
    return formatDateTime(timestamp);
  }

  return `${formatDate(timestamp)} ${
    launchLocalDateTimeParts[2]
  } ${`GMT ${launchLocalDateTimeParts[3]}`}`;
}
