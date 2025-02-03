import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchFavoritesAction, postFavoriteAction } from '../../store/api-actions';

import { CompactOffer, DetailedOffer } from '../../types/offers';

import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

type BookmarkButtonProps = {
  offer: CompactOffer | DetailedOffer;
  isOfferBookmark?: boolean | undefined;
}

function BookmarkButton({ offer, isOfferBookmark }: BookmarkButtonProps) {

  const dispatch = useAppDispatch();
  const [buttonActive, setButtonActive] = useState<boolean>(offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  const toggleOfferAsFavorite = async () => {
    await dispatch(postFavoriteAction({ offerId: offer.id, status: offer.isFavorite }));
    await dispatch(fetchFavoritesAction());
    setButtonActive((previousState) => !previousState);
  };

  function handleBookmarkClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }

    toggleOfferAsFavorite();
  }

  const buttonData = {
    class: isOfferBookmark ? 'offer' : 'place-card',
    size: {
      width: isOfferBookmark ? 31 : 18,
      height: isOfferBookmark ? 33 : 19,
    }
  };

  return (
    <button
      className={`button ${buttonData.class}__bookmark-button ${buttonActive ? `${buttonData.class}__bookmark-button--active` : ''}`}
      type="button"
      onClick={(event) => handleBookmarkClick(event)}
    >
      <svg
        className={`${buttonData.class}__bookmark-icon`}
        width={buttonData.size.width}
        height={buttonData.size.height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonActive ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
