import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewsTitle from '../../components/reviews-title/reviews-title';
import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';

import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import { CompactOffer, offerId } from '../../types/offers';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchDetailedOfferAction, fetchNearbyOffersAction, fetchOfferCommentsAction } from '../../store/api-actions';

import { convertRatingToStars } from '../../utils';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { AuthorizationStatus } from '../../const';


type FormDataState = {
  'review': string | null;
  'rating': string | null;
}

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<offerId>();
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataState>(
    {
      'review': null,
      'rating': null,
    }
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchOffer = async () => {
      try {
        await Promise.all([
          dispatch(fetchDetailedOfferAction(id)).unwrap(),
          dispatch(fetchNearbyOffersAction(id)).unwrap(),
          dispatch(fetchOfferCommentsAction(id)).unwrap(),
        ]);
        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchOffer();
  }, [id]);

  const currentOffer = useAppSelector((state) => state.detailedOffer);
  const neighbourhoodOffers = useAppSelector((state) => state.nearbyOffers) || [];
  const offerComments = useAppSelector((state) => state.offerComments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (error) {
    return (
      <Navigate to={'/404'} />
    );
  }

  if (!currentOffer) {
    return (
      <LoadingScreen />
    );
  }

  const { rating, type, bedrooms, maxAdults, price, goods, host, description, city } = currentOffer;
  const ratingStars = convertRatingToStars(rating);
  const offersForMap = [...neighbourhoodOffers];
  offersForMap.push(currentOffer as CompactOffer);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formDataObject: FormData = new FormData(form);
    const review = formDataObject.get('review');
    const reviewRating = formDataObject.get('rating');

    if (typeof review === 'string' && typeof reviewRating === 'string') {
      setFormData(
        {
          ...formData,
          'review': review,
          'rating': reviewRating,
        }
      );
    } else {
      throw new Error('Form data is not valid');
    }
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                currentOffer?.images.map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                currentOffer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingStars}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                {
                  type && (
                    <li className="offer__feature offer__feature--entire">{type}</li>
                  )
                }
                {
                  bedrooms && (
                    <li className="offer__feature offer__feature--bedrooms">
                      {bedrooms} Bedrooms
                    </li>
                  )
                }
                {
                  maxAdults && (
                    <li className="offer__feature offer__feature--adults">
                      Max {maxAdults} adults
                    </li>
                  )
                }
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    goods.map((good) => (
                      <li key={good} className="offer__inside-item">{good}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {
                    host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )
                  }
                </div>
                <div className="offer__description">
                  {
                    description && (
                      <p className="offer__text">
                        {description}
                      </p>
                    )
                  }
                </div>
              </div>
              {
                offerComments && (
                  <section className="offer__reviews reviews">
                    <ReviewsTitle reviews={offerComments} />
                    <ReviewsList reviews={offerComments} />
                    {
                      authorizationStatus === AuthorizationStatus.Auth && (
                        <ReviewForm onSubmit={onSubmit} />
                      )
                    }
                  </section>
                )
              }
            </div>
          </div>
          <Map city={city} offers={offersForMap} cardActive={id ?? null} mapClassName='offer__map map' mapHeight='570px' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {
                neighbourhoodOffers.map((offer) => <PlaceCard key={offer.id} offer={offer} />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
