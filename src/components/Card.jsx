import React from 'react';

const Card = ({ onCardClick, link, name, likes }) => {
  function handleClick() {
    onCardClick({ link, name });
  }

  return (
    <article className="card">
      <img
        onClick={handleClick}
        className="card__image"
        src={link}
        alt={name}
      />
      <div className="card__wrapper">
        <h2 className="card__title">{name}</h2>
        <div>
          <button
            className="card__btn card__btn_type_like"
            type="button"
            aria-label="Лайкнуть"
          />
          <p className="card__counter">{likes.length}</p>
        </div>
      </div>
      <button
        className="card__btn card__btn_type_delete"
        type="button"
        aria-label="Удалить"
      />
    </article>
  );
};

export default Card;
