import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewsTitle from '../../components/reviews-title/reviews-title';
import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';

import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CompactOffer, OfferId } from '../../types/offers';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchDetailedOfferAction, fetchNearbyOffersAction, fetchOfferCommentsAction } from '../../store/api-actions';

import { convertRatingToStars } from '../../utils';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { AuthorizationStatus } from '../../const';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';

const OFFER_IMAGES_COUNT = 6;
const NEIBOURHOOD_OFFERS_COUNT = 3;

function Offer(): JSX.Element {
  /** Хук для отправки действий в Redux */
  const dispatch = useAppDispatch();
  /** Извлечение ID предложения из параметров URL */
  const { id } = useParams<OfferId>();
  /** Локальное состояние для отслеживания ошибки при загрузке данных */
  const [error, setError] = useState<boolean>(false);

  /** Эффект для загрузки данных предложения, соседних предложений и комментариев при изменении ID предложения */
  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchOffer = async () => {
      try {
        /** Загрузка данных предложения, соседних предложений и комментариев параллельно */
        await Promise.all([
          dispatch(fetchDetailedOfferAction(id)).unwrap(),
          dispatch(fetchNearbyOffersAction(id)).unwrap(),
          dispatch(fetchOfferCommentsAction(id)).unwrap(),
        ]);
        setError(false); // Сброс ошибки, если загрузка успешна
      } catch {
        setError(true); // Установка ошибки, если произошла ошибка при загрузке
      }
    };

    fetchOffer();
  }, [id]);

  /** Селекторы для получения данных из Redux-хранилища */
  const currentOffer = useAppSelector((state) => state.detailedOffer);
  const neighbourhoodOffers = useAppSelector((state) => state.nearbyOffers?.slice(0, NEIBOURHOOD_OFFERS_COUNT)) || [];
  const offerComments = useAppSelector((state) => state.offerComments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  /** Отображение страницы 404, если произошла ошибка */
  if (error) {
    return (
      <Navigate to={'/404'} />
    );
  }

  /** Отображение экрана загрузки, если данные предложения еще не загружены */
  if (!currentOffer) {
    return (
      <LoadingScreen />
    );
  }

  /** Извлечение необходимых данных из текущего предложения */
  const { rating, type, bedrooms, maxAdults, price, goods, host, description, city } = currentOffer;
  /** Конвертация числового рейтинга в процент для отображения звезд */
  const ratingStars = convertRatingToStars(rating);
  /** Создание массива предложений для карты, включая текущее предложение */
  const offersForMap = [...neighbourhoodOffers];
  offersForMap.push(currentOffer as CompactOffer);
  /** Обрезает количество изображений до 6 */
  const currentOfferImages = currentOffer.images.slice(0, OFFER_IMAGES_COUNT);

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
                currentOfferImages.map((image) => (
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
                {
                  currentOffer && (
                    <BookmarkButton offer={currentOffer} isOfferBookmark />
                  )
                }
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
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
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
                      authorizationStatus === AuthorizationStatus.Auth && id && (
                        <ReviewForm offerId={id} />
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
                neighbourhoodOffers.map((offer) => <PlaceCard isNeibourhood key={offer.id} offer={offer} />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
