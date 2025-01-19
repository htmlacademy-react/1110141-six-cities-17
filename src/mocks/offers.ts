import { CompactOffers } from '../types/offers';
import { Cities, HousingType } from '../const';

export const neighbourhoodOffers: CompactOffers = [
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: HousingType.Apartment,
    price: 185,
    city: {
      name: Cities.Amsterdam,
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: HousingType.Room,
    price: 80,
    city: {
      name: Cities.Amsterdam,
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: HousingType.Apartment,
    price: 132,
    city: {
      name: Cities.Amsterdam,
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
  },
];
