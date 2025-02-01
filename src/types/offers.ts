import { Cities, HousingType } from '../const';

export type OfferId = string;

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityData = {
  name: Cities;
  location: Location;
}

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CompactOffer = {
  id: OfferId;
  title: string;
  type: HousingType;
  price: number;
  city: CityData;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type DetailedOffer = CompactOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type CompactOffers = CompactOffer[];
export type DetailedOffers = DetailedOffer[];
