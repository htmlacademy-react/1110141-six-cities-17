import { useAppDispatch, useAppSelector } from '../../hooks';

import { AppRoute, AuthorizationStatus } from '../../const';
import Logo from '../logo/logo';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useMemo } from 'react';

type HeaderProps = {
  isShortHeader?: boolean | undefined;
}

function Header({ isShortHeader }: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus);
  const userData = useAppSelector((state) => state.userData);
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offers = useAppSelector((state) => state.offers);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  const favoriteCount = useMemo(() => (
    offers.filter((offer) => offer.isFavorite).length
  ), [offers]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {
            isShortHeader ? '' : (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    isUserAuthorized ? (
                      <>
                        <li className="header__nav-item user">
                          <Link
                            className="header__nav-link header__nav-link--profile"
                            to={AppRoute.Favorites}
                          >
                            <div
                              className="header__avatar-wrapper user__avatar-wrapper"
                              style={{ backgroundImage: `url(${userData?.avatarUrl})` }}
                            >
                            </div>
                            <span className="header__user-name user__name">
                              {userData?.email}
                            </span>
                            <span className="header__favorite-count">{favoriteCount}</span>
                          </Link>
                        </li>
                        <li className="header__nav-item">
                          <a className="header__nav-link" onClick={handleClick} href="#">
                            <span className="header__signout">Sign out</span>
                          </a>
                        </li>
                      </>
                    ) : (
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__login">Sign in</span>
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </nav>
            )
          }
        </div >
      </div >
    </header >
  );
}

export default Header;
