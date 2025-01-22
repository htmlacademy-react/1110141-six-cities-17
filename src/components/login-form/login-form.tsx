import { FormEvent, useRef } from 'react';

import { AuthData } from '../../types/authData';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

function LoginForm() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const authData = {
        login: loginRef.current.value,
        password: passwordRef.current.value
      };

      onSubmit(authData);
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Main} />
    );
  }

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          ref={loginRef}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
