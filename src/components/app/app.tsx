import Main from '../../pages/main/main';
import Page404 from '../../pages/404/404';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';

import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<Main />} />
            <Route path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.Offer} element={<Offer />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
