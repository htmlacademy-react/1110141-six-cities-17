import PlaceCard from '../place-card/place-card';

import { CompactOffer } from '../../types/offers';

import { useState } from 'react';

type PlaceListProps = {
  offers: CompactOffer[];
}

function PlaceList({ offers }: PlaceListProps) {

  // Временный костыль чтобы линтер не ругался
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardActive, setCardActive] = useState<string | null>(null);

  function handleMouseOver(id: string) {
    setCardActive(id);
  }
  function handleMouseout() {
    setCardActive(null);
  }
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
