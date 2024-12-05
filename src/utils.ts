export function convertRatingToStars(rating: number) {
  /** Величина на которую нужно умножить рейтинг чтобы получить проценты */
  const MULTIPLYER_FOR_PERCANTAGE_CONVERSION = 20;

  if (rating) {
    return MULTIPLYER_FOR_PERCANTAGE_CONVERSION * Math.round(rating);
  }
  return 0;
}
