import { Comment } from '../../types/comments';

import { convertRatingToStars } from '../../utils';

import dayjs from 'dayjs';

type ReviewItemProps = {
  review: Comment;
}

function ReviewItem({ review }: ReviewItemProps) {
  const { date, user, comment, rating } = review;

  const formatDateTime = dayjs(date).format('YYYY-MM-DD');
  const formatDate = dayjs(date).format('MMMM YYYY');

  const ratingStars = convertRatingToStars(rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingStars}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={formatDateTime}>
          {formatDate}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
