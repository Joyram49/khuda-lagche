export function convertUnixTimestampToLocalTime(timestamp) {
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString(undefined, options);
}
