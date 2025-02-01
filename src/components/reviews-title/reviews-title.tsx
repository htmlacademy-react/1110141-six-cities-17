import { Comments } from '../../types/comments';

type ReviewsTitleProps = {
  reviews: Comments;
}

function ReviewsTitle({ reviews }: ReviewsTitleProps) {
  return (
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
  );
}

export default ReviewsTitle;
