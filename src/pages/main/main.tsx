import Header from '../../components/header/header';
import PlaceList from '../../components/places-list/place-list';
import Map from '../../components/map/map';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AMSTERDAM } from '../../mocks/cities';

import { useAppSelector } from '../../hooks';

import { selectFilteredOffers } from '../../selectFilteredOffers';


function Main(): JSX.Element {
  const [cardActive, setCardActive] = useState<string | null>(null);
  const offers = useSelector(selectFilteredOffers);
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
      <Header />
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
              <b className="places__found">{foundPlacesCount} places to stay in {useAppSelector((store) => store.city)}</b>
              <PlacesSorting />
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
