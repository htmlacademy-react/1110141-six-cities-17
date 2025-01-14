import { HousingType } from '../const';

export type offerId = string;

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CompactOffer = {
  id: offerId;
  title: string;
  type: HousingType;
  price: number;
  city: City;
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
