import { Comments } from '../../types/comments';
import ReviewItem from '../review-item/review-item';
import { useMemo } from 'react';

type ReviewsListProps = {
  reviews: Comments;
}

function ReviewsList({ reviews }: ReviewsListProps) {
  const sortedReviews = useMemo(() => {
    const gg = [...reviews || []].sort((firstComment, secondComment) => {
      const firstCommentDate = new Date(firstComment.date);
      const secondCommentDate = new Date(secondComment.date);

      if (firstCommentDate > secondCommentDate) {
        return -1;
      } else if (firstCommentDate < secondCommentDate) {
        return 1;
      }

      return 0;
    });

    return gg;
  }, [reviews]);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
