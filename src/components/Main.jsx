import React, { useEffect, useState } from 'react';

import { api } from '../utils/Api';
import Card from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfoData()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__btn profile__btn_type_avatar"
          >
            <img
              src={userAvatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__btn profile__btn_type_edit"
                type="button"
                aria-label="Редактировать"
              />
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__btn profile__btn_type_add"
          type="button"
          aria-label="Добавить"
        />
      </section>

      <section className="gallery">
        {cards.map((item, i) => (
          <Card
            name={item.name}
            link={item.link}
            likes={[...item.likes]}
            key={item._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
