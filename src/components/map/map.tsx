import { useEffect, useRef } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useMap } from '../../useMap';

import { CityData } from '../../types/offers';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { CompactOffer } from '../../types/offers';


type MapProps = {
  city: CityData;
  offers: CompactOffer[];
  cardActive: string | null;
  mapClassName: string;
  mapHeight: string;
}

function Map({ city, offers, cardActive, mapClassName, mapHeight }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  /** Добавит иконки в неизменяемый контейнер */
  const defaultIconRef = useRef<leaflet.Icon | null>(null);
  const currentIconRef = useRef<leaflet.Icon | null>(null);

  /** Проверит созданы ли уже иконки, если нет — создаст */
  if (!defaultIconRef.current || !currentIconRef.current) {
    defaultIconRef.current = leaflet.icon({
      iconUrl: URL_MARKER_DEFAULT,
      iconSize: [27, 39],
      iconAnchor: [27, 39],
    });

    currentIconRef.current = leaflet.icon({
      iconUrl: URL_MARKER_CURRENT,
      iconSize: [27, 39],
      iconAnchor: [27, 39],
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
      style={{ height: mapHeight }}
      ref={mapRef}
    >

    </section>
  );

}


export default Map;
