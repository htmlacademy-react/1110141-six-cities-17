import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { OfferId } from '../../types/offers';
import { postCommentAction } from '../../store/api-actions';

const STARS_COUNT = 5;
const LABEL_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

type FormDataState = {
  comment: string;
  rating: string;
}

type ReviewFormProps = {
  offerId: OfferId;
}

function ReviewForm({ offerId }: ReviewFormProps) {
  const [formData, setFormData] = useState<FormDataState>({
    comment: '',
    rating: '',
  });
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [isSubmitting, setSubmitting] = useState<boolean>(false); // Новое состояние
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const comment = formData.comment;
    const reviewRating = Number(formData.rating);

    if (comment && reviewRating) {
      setSubmitting(true); // Блокируем форму
      dispatch(postCommentAction({
        offerId,
        comment: { comment, rating: reviewRating }
      }))
        .unwrap()
        .then(() => {
          setFormData({ comment: '', rating: '' });
          form.reset();
          setSubmitDisabled(true);
        })
        .catch(() => {
          setSubmitDisabled(false);
        })
        .finally(() => {
          setSubmitting(false); // Разблокируем форму в любом случае
        });
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (isSubmitting) {
      return;
    }

    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const isCommentValid = name === 'comment'
      ? value.trim().length >= 50 && value.trim().length <= 300
      : formData.comment.trim().length >= 50 && formData.comment.trim().length <= 300;

    const isRatingValid = name === 'rating'
      ? !!value
      : !!formData.rating;

    setSubmitDisabled(!(isCommentValid && isRatingValid));
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="comment">
        Your comment
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: STARS_COUNT }, (_, i) => {
          const ratingValue = STARS_COUNT - i;
          const labelTitle = LABEL_TITLES[i];
          return (
            <Fragment key={ratingValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={formData.rating === String(ratingValue)}
                onChange={handleChange}
                disabled={isSubmitting} // Блокировка радио-кнопок
              />
              <label
                htmlFor={`${ratingValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={labelTitle}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleChange}
        disabled={isSubmitting} // Блокировка текстового поля
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit comment please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isSubmitting} // Комбинированная блокировка кнопки
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
