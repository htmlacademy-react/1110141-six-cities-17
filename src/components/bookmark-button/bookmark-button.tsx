import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { postFavoriteAction } from '../../store/api-actions';

import { CompactOffer } from '../../types/offers';

import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

type BookmarkButtonProps = {
  offer: CompactOffer;
}

function BookmarkButton({ offer }: BookmarkButtonProps) {

  const dispatch = useAppDispatch();
  const [buttonActive, setButtonActive] = useState<boolean>(offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();

  function handleBookmarkClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }

    dispatch(postFavoriteAction({ offerId: offer.id, status: offer.isFavorite }));
    setButtonActive(!offer.isFavorite);
  }

  return (
    <button
      className={`place-card__bookmark-button ${buttonActive ? 'place-card__bookmark-button--active' : ''} button`}
      type="button"
      onClick={(event) => handleBookmarkClick(event)}
    >
      <svg
        className="place-card__bookmark-icon"
        width={18}
        height={19}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
