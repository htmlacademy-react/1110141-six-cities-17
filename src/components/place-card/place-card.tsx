import { CompactOffer } from '../../types/offers';

import { AuthorizationStatus, AppRoute } from '../../const';

import { Link, useNavigate } from 'react-router-dom';
import { convertRatingToStars, getOfferLink } from '../../utils';

type PlaceCardProps = {
  offer: CompactOffer;
  onMouseOver: (id: string) => void;
  onMouseOut: () => void;
}

function PlaceCard({ offer, onMouseOver, onMouseOut }: PlaceCardProps): JSX.Element {

  const { title, price, type, previewImage, isPremium, rating, id } = offer;
  const ratingStars = convertRatingToStars(rating).toString(10);
  const offerLink = getOfferLink(id);
  const navigate = useNavigate();

  function handleBookmarkClick(authorizationStatus: string) {
    if (!Object.values(AuthorizationStatus).includes(authorizationStatus as AuthorizationStatus)) {
      return null;
    }
    if ((authorizationStatus as AuthorizationStatus) !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  }
  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => onMouseOver(offer.id)}
      onMouseOut={onMouseOut}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
            onClick={() => handleBookmarkClick(AuthorizationStatus.Auth)}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingStars}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
