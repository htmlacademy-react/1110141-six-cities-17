import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { OfferId } from '../../types/offers';
import { postCommentAction } from '../../store/api-actions';

const STARS_COUNT = 5;
const LABEL_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

type FormDataState = {
  comment: string | null;
  rating: string | null;
}

type ReviewFormProps = {
  offerId: OfferId;
}

function ReviewForm({ offerId }: ReviewFormProps) {
  /** Локальное состояние для хранения данных формы (отзыв и рейтинг) */
  const [formData, setFormData] = useState<FormDataState>(
    {
      'comment': null,
      'rating': null,
    }
  );
  /** Локальное состояние отвечающее за доступность кнопки отправки формы */
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  /** Обработчик отправки формы */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    /** Создание объекта FormData из формы */
    const formDataObject: FormData = new FormData(form);
    /** Получение отзыва и рейтинга из данных формы */
    const comment = formDataObject.get('comment')?.toString();
    const reviewRating = +(formDataObject.get('rating') || 0);

    if (comment && reviewRating) {
      /** Отправляем комментарий на сервак если всё чики бомбони */
      dispatch(postCommentAction({ offerId, comment: { comment: comment, rating: reviewRating } }));
    } else {
      throw new Error('Данные формы недействительны');
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const comment = (value || formData.comment || '');
    const commentLength = comment.trim().length;

    /** Короче вот этот мув (formData.comment || '') нужен чтобы тс не пиздел что что-то из этого is possibly null, в остальном это просто проверка на длину комментария */
    const iscommentValid = (name === 'comment' ? commentLength >= 50 && commentLength <= 300 : false);
    const isRatingValid = (name === 'rating' ? !!value : !!formData.rating);

    setSubmitDisabled(!(iscommentValid && isRatingValid));
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
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
                defaultValue={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                onChange={handleChange}
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
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit comment please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
