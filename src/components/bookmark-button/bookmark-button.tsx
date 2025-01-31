import { useAppDispatch } from '../../hooks';
import { postFavoriteAction } from '../../store/api-actions';
import { CompactOffer } from '../../types/offers';

type BookmarkButtonProps = {
  offer: CompactOffer;
}

function BookmarkButton({ offer }: BookmarkButtonProps) {

  const dispatch = useAppDispatch();

  function handleBookmarkClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    dispatch(postFavoriteAction({ offerId: offer.id, status: offer.isFavorite }));
  }


  return (
    <button
      className="place-card__bookmark-button place-card__bookmark-button--active button"
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
