import { Cities } from '../../const';

import { changeCity, changeOffersByCity } from '../../store/actions';

import { store } from '../../store';


function LocationsList() {

  const ACTIVE_CLASS = 'tabs__item--active';

  function handleClick(event: React.MouseEvent<HTMLLIElement>) {
    event.preventDefault();

    const clickedElement = event.target as HTMLLIElement;
    const isSpan = clickedElement.tagName === 'SPAN';

    /** Тут идёт предположение, что таргетом клика был любой ДОЧЕРНИЙ элемент li.locations__item */
    const isLink = clickedElement.tagName === 'A';

    if (isSpan || isLink) {
      /** Проверяет, по какому конкретно элементу был клик */
      const locationsLink = isSpan ? clickedElement.closest('.locations__item-link') : clickedElement;
      const itemSpan = isSpan ? clickedElement : locationsLink?.querySelector('span');

      /** Проверяет, содержат ли переменные то, что ожидается (a и span) */
      if (!(locationsLink instanceof HTMLAnchorElement) || (!(itemSpan instanceof HTMLSpanElement))) {
        return;
      }

      /** Получает текущее значение города и предыдущее */
      const cityTitle = itemSpan.textContent as Cities;
      const previousCity = store.getState();

      /** Если они не равны - осуществляет диспатч */
      if (cityTitle && (previousCity as { city: Cities }).city !== cityTitle) {
        if (Object.values(Cities).includes(cityTitle)) {
          store.dispatch(changeCity(cityTitle));
          store.dispatch(changeOffersByCity());
        }

        /** Убирает класс "активности" у текущего "активного" элемента, если таковой имеется */
        document.querySelector(`.${ACTIVE_CLASS}`)?.classList.remove(ACTIVE_CLASS);
        /** Добавляет класс активность */
        locationsLink.classList.add(ACTIVE_CLASS);
      }
    }
  }

  return (
    <ul className="locations__list tabs__list">
      {
        Object.values(Cities).map((city) => (
          <li key={city} className="locations__item" onClick={handleClick}>
            <a className="locations__item-link tabs__item" href="#">
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default LocationsList;
