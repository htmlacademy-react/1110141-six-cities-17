import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/login-form/login-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/actions';
import { AppRoute, Cities } from '../../const';
import { useNavigate } from 'react-router-dom';


function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const citiesValues = Object.values(Cities);
  const randomCityIndex = Math.floor(Math.random() * citiesValues.length);
  const randomCity = citiesValues[randomCityIndex];
  const currentCity = useAppSelector((state) => state.city);
  const navigate = useNavigate();

  const handleLocationsItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentCity !== randomCity) {
      dispatch(changeCity(randomCity));
    }
    navigate(AppRoute.Main);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header isShortHeader />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={(event) => handleLocationsItemClick(event)}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
