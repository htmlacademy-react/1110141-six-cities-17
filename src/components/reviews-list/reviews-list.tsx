import { Comments } from '../../types/comments';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Comments;
}

function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
