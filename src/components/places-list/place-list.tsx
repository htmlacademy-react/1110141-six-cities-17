import PlaceCard from '../place-card/place-card';
import { CompactOffers } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import { sortOffers } from '../../utils';

type PlaceListProps = {
  offers: CompactOffers;
  handleMouseOver: (id: string) => void;
  handleMouseout: () => void;
}

function PlaceList({ offers, handleMouseOver, handleMouseout }: PlaceListProps) {

  const sort = useAppSelector((state) => state.sort);
  const currentSort = sort.find((item) => item.isActive === true);

  const offersToSort: CompactOffers = structuredClone(offers);

  let sortedOffers: CompactOffers | null = null;
  if (currentSort) {
    sortedOffers = sortOffers(currentSort, offersToSort, offers);
  } else {
    sortedOffers = offers;
    throw new Error('Current sort is not specified or undefined');
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
