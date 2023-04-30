import React, { useContext } from 'react';

import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const userContext = useContext(CurrentUserContext);
  const cardsContext = useContext(CardsContext);

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
              src={userContext.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userContext.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__btn profile__btn_type_edit"
                type="button"
                aria-label="Редактировать"
              />
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
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
        {cardsContext.map((item, i) => (
          <Card
            name={item.name}
            link={item.link}
            likes={[...item.likes]}
            key={item._id}
            owner={item.owner}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
