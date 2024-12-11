import PlaceCard from '../place-card/place-card';

import { CompactOffers } from '../../types/offers';

type PlaceListProps = {
  offers: CompactOffers;
  handleMouseOver: (id: string) => void;
  handleMouseout: () => void;
}

function PlaceList({ offers, handleMouseOver, handleMouseout }: PlaceListProps) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
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
