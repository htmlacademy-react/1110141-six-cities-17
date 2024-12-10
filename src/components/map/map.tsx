import { useEffect, useRef } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useMap } from '../../useMap';

import { City } from '../../types/cities';
import {
  URL_MARKER_DEFAULT,
  // URL_MARKER_CURRENT
} from '../../const';
import { CompactOffer } from '../../types/offers';


type MapProps = {
  city: City;
  offers: CompactOffer[];
}

function Map({ city, offers }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, defaultCustomIcon]);

  return (
    <section
      className="cities__map map"
      style={{ height: '600px' }}
      ref={mapRef}
    >

    </section>
  );

}


export default Map;
