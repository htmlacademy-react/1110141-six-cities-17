import { Review } from '../../types/reviews';

type ReviewsTitleProps = {
  reviews: Review[];
}

function ReviewsTitle({ reviews }: ReviewsTitleProps) {
  return (
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
  );
}

export default ReviewsTitle;
