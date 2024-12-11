import { HousingType } from '../const';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  name: string;
  location: Location;
}

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CompactOffer = {
  id: string;
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

export type DetailedOffer = {
  offer: CompactOffer;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type CompactOffers = CompactOffer[];
export type DetailedOffers = DetailedOffer[];
