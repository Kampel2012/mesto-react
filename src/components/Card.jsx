import React from 'react';

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.link);
  }

  return (
    <article className="card">
      <img
        onClick={handleClick}
        className="card__image"
        src={props.link}
        alt={props.name}
      />
      <div className="card__wrapper">
        <h2 className="card__title">{props.name}</h2>
        <div>
          <button
            className="card__btn card__btn_type_like"
            type="button"
            aria-label="Лайкнуть"
          ></button>
          <p className="card__counter">{props.likes.length}</p>
        </div>
      </div>
      <button
        className="card__btn card__btn_type_delete"
        type="button"
        aria-label="Удалить"
      ></button>
    </article>
  );
};

export default Card;
