import { MutableRefObject, useEffect, useRef, useState } from 'react';

import leaflet from 'leaflet';

import { CityData } from './types/offers';
import { Cities } from './const';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: CityData;
}

function useMap({ mapRef, city }: UseMapProps) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const mapInstance = useRef<leaflet.Map | null>(null);
  const previousCity = useRef<Cities | null>(null);

  useEffect(() => {
    if (!isRenderedRef.current && mapRef.current !== null) {
      mapInstance.current = leaflet.map(mapRef?.current, {
        center: [
          city.location.latitude,
          city.location.longitude,
        ],
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(mapInstance.current);

      setMap(mapInstance.current);
      isRenderedRef.current = true;
    } else if (mapInstance.current && previousCity.current !== city.name) {
      mapInstance.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    previousCity.current = city.name;
  }, [mapRef, city]);

  return map;
}

export { useMap };
