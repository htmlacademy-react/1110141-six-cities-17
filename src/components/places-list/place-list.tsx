import PlaceCard from '../place-card/place-card';

import { CompactOffer, CompactOffers } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import { SortTypes } from '../../const';

type PlaceListProps = {
  offers: CompactOffers;
  handleMouseOver: (id: string) => void;
  handleMouseout: () => void;
}

function sortPriceToHight(firstOffer: CompactOffer, secondOffer: CompactOffer) {
  if (firstOffer.price > secondOffer.price) {
    return 1;
  } else if (firstOffer.price < secondOffer.price) {
    return -1;
  }
  return 0;
}

function sortPriceToLow(firstOffer: CompactOffer, secondOffer: CompactOffer) {
  if (firstOffer.price < secondOffer.price) {
    return 1;
  } else if (firstOffer.price > secondOffer.price) {
    return -1;
  }
  return 0;
}

function sortTop(firstOffer: CompactOffer, secondOffer: CompactOffer) {
  if (firstOffer.rating < secondOffer.rating) {
    return 1;
  } else if (firstOffer.rating > secondOffer.rating) {
    return -1;
  }
  return 0;
}

function PlaceList({ offers, handleMouseOver, handleMouseout }: PlaceListProps) {

  const sort = useAppSelector((state) => state.sort);
  const currentSort = sort.find((item) => item.isActive === true);

  let sortedOffers: CompactOffers = structuredClone(offers);

  switch (currentSort?.title) {
    case SortTypes.PriceToHigh:
      sortedOffers.sort(sortPriceToHight);
      break;
    case SortTypes.PriceToLow:
      sortedOffers.sort(sortPriceToLow);
      break;
    case SortTypes.Top:
      sortedOffers.sort(sortTop);
      break;
    default:
      sortedOffers = offers;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseout}
        />
      ))}
    </div>
  );
}

export default PlaceList;
