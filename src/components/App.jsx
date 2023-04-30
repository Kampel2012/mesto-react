import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const user = await api.getUserInfoData();
        setCurrentUser(user);
        const cards = await api.getInitialCards();
        setCards([...cards]);
      } catch (error) {
        console.warn(error);
      }
    }
    getUser();
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

  function handleCardLike(likes, _id) {
    const isLiked = likes.some((i) => i._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';
    api
      .changeLikeCardStatus(_id, method)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
      })
      .catch(console.warn);
  }

  function handleDeleteClick(id) {
    api
      .deleteCard(id)
      .then(() => setCards((state) => state.filter((item) => item._id !== id)))
      .catch(console.warn);
  }

  async function handleUpdateUser(userData) {
    try {
      const res = await api.editProfile(userData);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      const res = await api.editProfileAvatar(link);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleAddPlaceSubmit(params) {
    try {
      const newCard = await api.addNewCard(params);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText={'Да'}
            onClose={closeAllPopups}
            isOpen={false}
          />
          <ImagePopup card={selectCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
