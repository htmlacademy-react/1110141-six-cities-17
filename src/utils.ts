import { AppRoute } from './const';

/**
 * Переводит рейтинг в проценты ширины заполненных звёзд
 * @param rating Рейтинг сущности который нужно отобразить в виде
 * @returns Число обозначающее ширину (проценты) которую нужно установить для заполненных звёзд
 */
export function convertRatingToStars(rating: number) {
  /** Величина на которую нужно умножить рейтинг чтобы получить проценты */
  const MULTIPLYER_FOR_PERCANTAGE_CONVERSION = 20;

  if (rating) {
    return MULTIPLYER_FOR_PERCANTAGE_CONVERSION * Math.round(rating);
  }
  return 0;
}

export function getOfferLink(offerId: string) {
  return AppRoute.Offer.replace(':id', offerId);
}
