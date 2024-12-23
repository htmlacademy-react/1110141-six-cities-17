import Logo from '../../components/logo/logo';
import PlaceList from '../../components/places-list/place-list';
import Map from '../../components/map/map';
import LocationsList from '../../components/locations-list/locations-list';

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import { AMSTERDAM } from '../../mocks/cities';
import { useAppSelector } from '../../hooks';


function Main(): JSX.Element {
  const [cardActive, setCardActive] = useState<string | null>(null);
  const offers = useAppSelector((state) => state.offers);
  const foundPlacesCount = offers.length;

  function handleMouseOver(id: string) {
    setCardActive(id);
  }
  function handleMouseout() {
    setCardActive(null);
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{foundPlacesCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <PlaceList offers={offers} handleMouseOver={handleMouseOver} handleMouseout={handleMouseout} />
            </section>
            <div className="cities__right-section">
              <Map city={AMSTERDAM} offers={offers} cardActive={cardActive} mapClassName='cities__map map' mapHeight='100%' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
