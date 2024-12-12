import { MutableRefObject, useEffect, useRef, useState } from 'react';

import leaflet from 'leaflet';

import { City } from './types/offers';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: City;
}

function useMap({ mapRef, city }: UseMapProps) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (!isRenderedRef.current && mapRef.current !== null) {
      const mapInstance = leaflet.map(mapRef?.current, {
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
        .addTo(mapInstance);

      setMap(mapInstance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export { useMap };
