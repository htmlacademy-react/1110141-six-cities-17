import PlaceCard from '../place-card/place-card';
import { CompactOffers } from '../../types/offers';
import { sortOffers } from '../../utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentSort } from '../../select-current-sort';

type PlaceListProps = {
  offers: CompactOffers;
  handleMouseOver: (id: string) => void;
  handleMouseout: () => void;
}

function PlaceList({ offers, handleMouseOver, handleMouseout }: PlaceListProps) {
  const currentSort = useSelector(selectCurrentSort);

  const offersToSort: CompactOffers = structuredClone(offers);

  let sortedOffers: CompactOffers | null = null;
  sortedOffers = useMemo(() => {
    if (currentSort) {
      return sortOffers(currentSort, offersToSort, offers);
    }
    return offers;
  }, [currentSort, offersToSort, offers]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          handleMouseOver={handleMouseOver}
          handleMouseout={handleMouseout}
        />
      ))}
    </div>
  );
}

export default PlaceList;
