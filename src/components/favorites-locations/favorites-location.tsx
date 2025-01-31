import { Cities } from '../../const';
import { CompactOffers } from '../../types/offers';
import FavoritesOffer from '../favorites-offer/Favorites-offer';

type FavoritesLocationsProps = {
  city: Cities;
  offers: CompactOffers;
}


function FavoritesLocations({ city, offers }: FavoritesLocationsProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoritesOffer key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesLocations;
