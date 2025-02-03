import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveSort } from '../../store/actions';
import { SortTypes } from '../../const';

function PlacesSorting() {
  const PLACES_OPTIONS_LIST_ACTIVE_CLASS = 'places__options--opened';

  const PLACES_OPTION_ACTIVE_CLASS = 'places__option--active';

  const [isPlacesOptionsListActive, setIsPlacesOptionsListActive] = useState(false);

  const sort = useAppSelector((state) => state.sort);

  const activeSortTitle = sort.find((item) =>
    item.isActive === true
  );

  const dispatch = useAppDispatch();

  function handleSortingTypeClick() {
    setIsPlacesOptionsListActive(!isPlacesOptionsListActive);
  }

  function handlePlacesOptionClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const target = event.currentTarget;

    if (target.textContent && Object.values(SortTypes).includes(target.textContent as SortTypes)) {
      dispatch(changeActiveSort(target.textContent as SortTypes));
      setIsPlacesOptionsListActive(false);
    }
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortingTypeClick}>
        {activeSortTitle?.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isPlacesOptionsListActive ? PLACES_OPTIONS_LIST_ACTIVE_CLASS : ''}`}>
        {
          sort.map((sortType) => (
            <li key={sortType.title} className={`places__option ${sortType.isActive ? PLACES_OPTION_ACTIVE_CLASS : ''}`} onClick={(event) => handlePlacesOptionClick(event)} tabIndex={0}>
              {sortType.title}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default PlacesSorting;
