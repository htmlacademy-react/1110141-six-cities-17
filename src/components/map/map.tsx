import { useEffect, useRef } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useMap } from '../../useMap';

import { City } from '../../types/cities';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { CompactOffer } from '../../types/offers';


type MapProps = {
  city: City;
  offers: CompactOffer[];
  cardActive: string | null;
  mapClassName: string;
}

function Map({ city, offers, cardActive, mapClassName }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  /** Добавит иконки в неизменяемый контейнер */
  const defaultIconRef = useRef<leaflet.Icon | null>(null);
  const currentIconRef = useRef<leaflet.Icon | null>(null);

  /** Проверит созданы ли уже иконки, если нет — создаст */
  if (!defaultIconRef.current || !currentIconRef.current) {
    defaultIconRef.current = leaflet.icon({
      iconUrl: URL_MARKER_DEFAULT,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    currentIconRef.current = leaflet.icon({
      iconUrl: URL_MARKER_CURRENT,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  }

  /** Создаст слой для карты */
  const layer = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (map) {

      layer.current = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {

        if (!currentIconRef.current || !defaultIconRef.current) {
          return;
        }

        const iconToSet: leaflet.Icon = cardActive === offer.id ? currentIconRef.current : defaultIconRef.current;

        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: iconToSet,
          })
          .addTo(layer.current ? layer.current : map);
      });

      return (() => {
        layer.current?.clearLayers();
      });
    }
  }, [map, offers, cardActive]);

  return (
    <section
      className={mapClassName}
      style={{ height: '100%' }}
      ref={mapRef}
    >

    </section>
  );

}


export default Map;
