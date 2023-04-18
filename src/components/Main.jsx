import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import Card from './Card';

const Main = (props) => {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfoData().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards([...res]);
    });
  }, []);

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.closeAllPopups}
      >
        <label className="pop-up__field">
          <input
            className="pop-up__input pop-up__input_type_name"
            type="text"
            name="name"
            id="pop-up__input-name"
            placeholder="Имя профиля"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="pop-up__input-error pop-up__input-name-error"></span>
        </label>
        <label className="pop-up__field">
          <input
            className="pop-up__input pop-up__input_type_job"
            type="text"
            name="job"
            id="pop-up__input-job"
            placeholder="Вид деятельности"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="pop-up__input-error pop-up__input-job-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="cards"
        title="Новое место"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllPopups}
      >
        <label className="pop-up__field">
          <input
            className="pop-up__input pop-up__input_type_placeName"
            type="text"
            name="name"
            id="pop-up__input-placeName"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="pop-up__input-error pop-up__input-placeName-error"></span>
        </label>
        <label className="pop-up__field">
          <input
            className="pop-up__input pop-up__input_type_placeLink"
            type="url"
            name="link"
            id="pop-up__input-placeLink"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="pop-up__input-error pop-up__input-placeLink-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.closeAllPopups}
      >
        <label className="pop-up__field">
          <input
            className="pop-up__input pop-up__input_type_placeLink"
            type="url"
            name="link"
            id="pop-up__input-linkAvatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="pop-up__input-error pop-up__input-linkAvatar-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm name="confirm" title="Вы уверены?"></PopupWithForm>

      <ImagePopup card={props.card} onClose={props.closeAllPopups} />

      <section className="profile">
        <div className="profile__wrapper">
          <button
            onClick={props.onEditAvatar}
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
                onClick={props.onEditProfile}
                className="profile__btn profile__btn_type_edit"
                type="button"
                aria-label="Редактировать"
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__btn profile__btn_type_add"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="gallery">
        {cards.map((item, i) => (
          <Card
            name={item.name}
            link={item.link}
            likes={[...item.likes]}
            key={item._id}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </>
  );
};

export default Main;
