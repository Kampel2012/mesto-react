import React from 'react';

const ImagePopup = (props) => {
  const classes = `pop-up pop-up_data_image-card ${
    props.card && 'pop-up_opened'
  }`;

  return (
    <>
      <div className={classes}>
        <div className="pop-up__container pop-up__container_data_image-card">
          <button
            onClick={props.onClose}
            type="button"
            className="pop-up__btn pop-up__btn_type_close"
            aria-label="Закрыть"
          ></button>
          <img className="pop-up__image-card" src={props.card} alt="#" />
          <p className="pop-up__subtitle"></p>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
