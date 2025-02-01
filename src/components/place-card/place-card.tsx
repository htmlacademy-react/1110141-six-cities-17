import { CompactOffer } from '../../types/offers';

import { Link } from 'react-router-dom';
import { convertRatingToStars, getOfferLink } from '../../utils';
import { memo } from 'react';
import BookmarkButton from '../bookmark-button/bookmark-button';

type PlaceCardProps = {
  offer: CompactOffer;
  handleMouseOver?: (id: string) => void;
  handleMouseout?: () => void;
}

const PlaceCard = memo(({ offer, handleMouseOver, handleMouseout }: PlaceCardProps): JSX.Element => {
  const { title, price, type, previewImage, isPremium, rating, id } = offer;
  const ratingStars = convertRatingToStars(rating);
  const offerLink = getOfferLink(id);

  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => handleMouseOver?.(offer.id)}
      onMouseOut={() => handleMouseout?.()}
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
          <BookmarkButton offer={offer} />
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
});

PlaceCard.displayName = 'PlaceCard';

export default PlaceCard;
