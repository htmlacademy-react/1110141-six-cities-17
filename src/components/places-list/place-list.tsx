import PlaceCard from '../place-card/place-card';

import { CompactOffer } from '../../types/offers';

type PlaceListProps = {
  offers: CompactOffer[];
}

function PlaceList({ offers }: PlaceListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default PlaceList;
