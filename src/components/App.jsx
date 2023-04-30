import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getInfo() {
      try {
        const userInfo = await api.getUserInfoData();
        setCurrentUser(userInfo);
        const cards = await api.getInitialCards();
        setCards([...cards]);
      } catch (error) {
        console.warn(error);
      }
    }
    getInfo();
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectCard(null);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectCard(card);
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <CardsContext.Provider value={cards}>
            <Header />

            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
            />

            <Footer />

            <PopupWithForm
              name="profile"
              title="Редактировать профиль"
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              buttonText={'Сохранить'}
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
                <span className="pop-up__input-error pop-up__input-name-error" />
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
                <span className="pop-up__input-error pop-up__input-job-error" />
              </label>
            </PopupWithForm>

            <PopupWithForm
              name="cards"
              title="Новое место"
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              buttonText={'Добавить'}
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
                <span className="pop-up__input-error pop-up__input-placeName-error" />
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
                <span className="pop-up__input-error pop-up__input-placeLink-error" />
              </label>
            </PopupWithForm>

            <PopupWithForm
              name="avatar"
              title="Обновить аватар"
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              buttonText={'Сохранить'}
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
                <span className="pop-up__input-error pop-up__input-linkAvatar-error" />
              </label>
            </PopupWithForm>

            <PopupWithForm
              name="confirm"
              title="Вы уверены?"
              buttonText={'Да'}
              onClose={closeAllPopups}
              isOpen={false}
            />

            <ImagePopup card={selectCard} onClose={closeAllPopups} />
          </CardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
