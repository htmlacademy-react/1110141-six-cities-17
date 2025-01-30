import { ChangeEvent, FormEvent, Fragment, useState } from 'react';

type FormDataState = {
  'review': string | null;
  'rating': string | null;
}

function ReviewForm() {
  /** Локальное состояние для хранения данных формы (отзыв и рейтинг) */
  const [formData, setFormData] = useState<FormDataState>(
    {
      'review': null,
      'rating': null,
    }
  );
  /** Локальное  */
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);

  /** Обработчик отправки формы */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    /** Создание объекта FormData из формы */
    const formDataObject: FormData = new FormData(form);
    /** Получение отзыва и рейтинга из данных формы */
    const review = formDataObject.get('review');
    const reviewRating = formDataObject.get('rating');

    if (typeof review === 'string' && typeof reviewRating === 'string') {
      /** Обновление локального состояния формы, если данные валидны */
      setFormData(
        {
          ...formData,
          'review': review,
          'rating': reviewRating,
        }
      );
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

    /** Короче вот этот мув (formData.review || '') нужен чтобы тс не пиздел что что-то из этого is possibly null, в остальном это просто проверка на длину комментария */
    const isReviewValid = (name === 'review' ? value.trim().length >= 50 : (formData.review || '').trim().length >= 50);
    const isRatingValid = (name === 'rating' ? !!value : !!formData.rating);

    setSubmitDisabled(!(isReviewValid && isRatingValid));
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: 5 }, (_, i) => {
          const ratingValue = 5 - i;
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
                title="perfect"
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
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
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
