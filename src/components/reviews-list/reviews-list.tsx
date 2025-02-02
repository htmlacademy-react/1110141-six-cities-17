import { Comments } from '../../types/comments';
import ReviewItem from '../review-item/review-item';
import { useMemo } from 'react';

const REVIEWS_MAX_COUNT = 10;

type ReviewsListProps = {
  reviews: Comments;
}

function ReviewsList({ reviews }: ReviewsListProps) {
  const sortedReviews = useMemo(() =>
    [...reviews || []].sort((firstComment, secondComment) => {
      const firstCommentDate = new Date(firstComment.date);
      const secondCommentDate = new Date(secondComment.date);

      if (firstCommentDate > secondCommentDate) {
        return -1;
      } else if (firstCommentDate < secondCommentDate) {
        return 1;
      }

      return 0;
    }), [reviews]);

  const slicedSortedReviews = sortedReviews.slice(0, REVIEWS_MAX_COUNT);

  return (
    <ul className="reviews__list">
      {slicedSortedReviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
