export const getReviewsByPizzaId = (pizzaId) => {
  return JSON.parse(localStorage.getItem(`reviews_${pizzaId}`)) || [];
};

export const saveReviewByPizzaId = (pizzaId, review) => {
  const existingReviews = getReviewsByPizzaId(pizzaId);

  existingReviews.push(review);

  localStorage.setItem(
    `reviews_${pizzaId}`,
    JSON.stringify(existingReviews)
  );
};

export const getAverageRating = (pizzaId) => {
  const reviews = getReviewsByPizzaId(pizzaId);

  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (total, review) => total + Number(review.rating),
    0
  );

  return (totalRating / reviews.length).toFixed(1);
};

export const getStars = (rating) => {
  const numberRating = Number(rating);

  return "★".repeat(numberRating) + "☆".repeat(5 - numberRating);
};