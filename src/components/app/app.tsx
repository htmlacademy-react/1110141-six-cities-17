import Main from '../../pages/main/main';
import Page404 from '../../pages/404/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';

type AppProps = {
  foundPlacesCount: number;
}

function App({ foundPlacesCount }: AppProps): JSX.Element {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main foundPlacesCount={foundPlacesCount} />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="login" element={<Login />} />
          <Route path="offer/:id" element={<Offer />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
