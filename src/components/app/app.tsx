import Main from '../../pages/main/main';
import Page404 from '../../pages/404/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../../const';

type AppProps = {
  foundPlacesCount: number;
}

function App({ foundPlacesCount }: AppProps): JSX.Element {
  return (

    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<Main foundPlacesCount={foundPlacesCount} />} />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
  );
}

export default App;
