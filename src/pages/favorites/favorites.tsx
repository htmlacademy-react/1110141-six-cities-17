import { Helmet } from 'react-helmet-async';

import { CompactOffers } from '../../types/offers';

import { useAppSelector } from '../../hooks';

import Header from '../../components/header/header';
import FavoritesLocations from '../../components/favorites-locations/favorites-location';

import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, Cities } from '../../const';


type SortedOffers = {
  [key: string]: CompactOffers;
}

function Favorites(): JSX.Element {

  const offers = useAppSelector((state) => state.offers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  });

  const favoriteOffers = useMemo(() => (
    offers.filter((offer) => offer.isFavorite)
  ), [offers]);

  const sortedOffers = useMemo(() =>
    favoriteOffers.reduce((accumulator, offer) => {
      const cityName = offer.city.name;
      if (!accumulator[cityName]) {
        accumulator[cityName] = [];
      }
      accumulator[cityName].push(offer);
      return accumulator;
    }, {} as SortedOffers), [favoriteOffers]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {(Object.keys(sortedOffers) as Cities[]).map((city) => (
                <FavoritesLocations
                  key={city}
                  city={city}
                  offers={sortedOffers[city]}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
