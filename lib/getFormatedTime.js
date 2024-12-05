export default function getFormatedTime(fromDate) {
  const now = new Date();
  const pastDate = new Date(fromDate);
  const diffInMs = now - pastDate;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44)); // approximate month length
  const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25)); // approximate year length

  if (seconds < 30) {
    return "few seconds before";
  } else if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""} before`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} before`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} before`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} before`;
  } else if (weeks < 5) {
    return `${weeks} week${weeks > 1 ? "s" : ""} before`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} before`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} before`;
  }
}
