import { CompactOffers } from '../types/offers';
import { HousingType } from '../const';

export const offers: CompactOffers = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: HousingType.Apartment,
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: HousingType.Room,
    price: 80,
    city: {
      name: 'Amsterdam',
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
      name: 'Amsterdam',
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
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: HousingType.Apartment,
    price: 180,
    city: {
      name: 'Amsterdam',
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
    id: '5',
    title: 'Wood and stone place',
    type: HousingType.Apartment,
    price: 100,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 10,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img/room.jpg',
  },
  {
    id: '6',
    title: 'Test Paris №1',
    type: HousingType.Apartment,
    price: 120,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '7',
    title: 'Test Paris №2',
    type: HousingType.Apartment,
    price: 90,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.4909553943508,
      longitude: 4.65309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: '8',
    title: 'Test Paris №3',
    type: HousingType.Apartment,
    price: 130,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.5909553943508,
      longitude: 4.95309666406198,
      zoom: 10,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/studio-01.jpg',
  },
];

export const neighbourhoodOffers: CompactOffers = [
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: HousingType.Apartment,
    price: 185,
    city: {
      name: 'Amsterdam',
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
      name: 'Amsterdam',
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
      name: 'Amsterdam',
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
