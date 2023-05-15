import React, { useState } from 'react';
import Header from './../components/Header';
import MyForm from '../components/MyForm';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <Header btnText="Войти" />
      <div className="myForm__Container">
        <MyForm
          buttonText={'Зарегистрироваться'}
          name={'register'}
          onSubmit={() => {}}
          title={'Регистрация'}
        >
          <label className="myForm__field">
            <input
              className="myForm__input myForm__input_type_name"
              type="text"
              name="name"
              id="myForm__input-name"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => setName(e.target.value)}
              value={name || ''}
            />
            <span className="myForm__input-error myForm__input-name-error" />
          </label>
          <label className="myForm__field">
            <input
              className="myForm__input myForm__input_type_password"
              onChange={(e) => setDescription(e.target.value)}
              type="password"
              name="password"
              id="myForm__input-password"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              value={description || ''}
            />
            <span className="myForm__input-error myForm__input-password-error" />
          </label>
        </MyForm>
        <p className="myForm__text_under">
          Уже зарегистрированы?{' '}
          {
            <Link to={'/sign-in'} className="myForm__link">
              Войти
            </Link>
          }
        </p>
      </div>
    </>
  );
};

export default Register;
