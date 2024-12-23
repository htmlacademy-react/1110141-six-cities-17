import { AppRoute, SortTypes } from './const';
import { CompactOffer, CompactOffers } from './types/offers';
import { SortElement } from './types/sort';

/**
 * Переводит рейтинг в проценты ширины заполненных звёзд
 * @param rating Рейтинг сущности который нужно отобразить в виде
 * @returns Число обозначающее ширину (проценты) которую нужно установить для заполненных звёзд
 */
export function convertRatingToStars(rating: number): number {
  /** Величина на которую нужно умножить рейтинг чтобы получить проценты */
  const MULTIPLYER_FOR_PERCANTAGE_CONVERSION = 20;

  if (rating) {
    return MULTIPLYER_FOR_PERCANTAGE_CONVERSION * Math.round(rating);
  }
  return 0;
}

/**
 * Формирует ссылку на страницу предложения по его идентификатору.
 *
 * @param {string} offerId - Идентификатор предложения.
 * @returns {string} Ссылка на страницу предложения.
 */
export function getOfferLink(offerId: string): string {
  return AppRoute.Offer.replace(':id', offerId);
}

/**
 * Сортирует предложения по возрастанию цены.
 *
 * @param {CompactOffer} firstOffer - Первое предложение для сравнения.
 * @param {CompactOffer} secondOffer - Второе предложение для сравнения.
 * @returns {number} 1, если первое предложение дороже второго, -1, если дешевле, 0, если равны.
 */
export function sortPriceToHight(firstOffer: CompactOffer, secondOffer: CompactOffer): -1 | 0 | 1 {
  if (firstOffer.price > secondOffer.price) {
    return 1;
  } else if (firstOffer.price < secondOffer.price) {
    return -1;
  }
  return 0;
}

/**
 * Сортирует предложения по убыванию цены.
 *
 * @param {CompactOffer} firstOffer - Первое предложение для сравнения.
 * @param {CompactOffer} secondOffer - Второе предложение для сравнения.
 * @returns {number} 1, если первое предложение дешевле второго, -1, если дороже, 0, если равны.
 */
export function sortPriceToLow(firstOffer: CompactOffer, secondOffer: CompactOffer): -1 | 0 | 1 {
  if (firstOffer.price < secondOffer.price) {
    return 1;
  } else if (firstOffer.price > secondOffer.price) {
    return -1;
  }
  return 0;
}

/**
 * Сортирует предложения по убыванию рейтинга.
 *
 * @param {CompactOffer} firstOffer - Первое предложение для сравнения.
 * @param {CompactOffer} secondOffer - Второе предложение для сравнения.
 * @returns {number} 1, если рейтинг первого предложения ниже второго, -1, если выше, 0, если равны.
 */
export function sortTop(firstOffer: CompactOffer, secondOffer: CompactOffer): -1 | 0 | 1 {
  if (firstOffer.rating < secondOffer.rating) {
    return 1;
  } else if (firstOffer.rating > secondOffer.rating) {
    return -1;
  }
  return 0;
}

export function sortOffers(currentSort: SortElement, offers: CompactOffers, defaultOffers: CompactOffers): CompactOffers {
  switch (currentSort?.title) {
    case SortTypes.PriceToHigh:
      offers.sort(sortPriceToHight);
      break;
    case SortTypes.PriceToLow:
      offers.sort(sortPriceToLow);
      break;
    case SortTypes.Top:
      offers.sort(sortTop);
      break;
    default:
      offers = defaultOffers;
  }

  return offers;
}
