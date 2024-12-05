export const generateRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce((accumulator, review) => {
    return (accumulator += review.rating);
  }, 0);
  const rating = totalRating / reviews.length;
  return rating.toFixed(2);
};
