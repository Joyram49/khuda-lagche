export function getFallbackName(arr) {
  const filteredArray = arr.filter((name) => name.trim() !== "");

  // Ensure there are at least two non-empty names in the array
  if (filteredArray.length < 2) {
    return filteredArray[0];
  }

  if (filteredArray.length >= 2) {
    const firstInitial = filteredArray[0][0].toUpperCase();
    const lastInitial =
      filteredArray[filteredArray.length - 1][0].toUpperCase();
    return firstInitial + lastInitial;
  }
  return "";
}
