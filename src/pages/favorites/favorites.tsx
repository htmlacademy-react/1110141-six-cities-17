import { Helmet } from 'react-helmet-async';

import { CompactOffers } from '../../types/offers';

import { useAppDispatch, useAppSelector } from '../../hooks';

import Header from '../../components/header/header';
import FavoritesLocations from '../../components/favorites-locations/favorites-location';

import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import { fetchFavoritesAction } from '../../store/api-actions';


type SortedOffers = {
  [key: string]: CompactOffers;
}

function Favorites(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(fetchFavoritesAction());
  }, [authorizationStatus]);

  const sortedOffers = useMemo(() =>
    favoriteOffers.reduce((accumulator, offer) => {
      const cityName = offer.city.name;
      if (!accumulator[cityName]) {
        accumulator[cityName] = [];
      }
      accumulator[cityName].push(offer);
      return accumulator;
    }, {} as SortedOffers), [favoriteOffers]);

  if (Object.keys(sortedOffers).length) {
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
  } else {
    return (
      <div className="page page--favorites-empty">
        <Helmet>
          <title>6 cities: favorites</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
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
}

export default Favorites;
