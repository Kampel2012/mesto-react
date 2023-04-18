import React from 'react';

const ImagePopup = (props) => {
  return (
    <>
      <div className="pop-up pop-up_data_image-card">
        <div className="pop-up__container pop-up__container_data_image-card">
          <button
            type="button"
            className="pop-up__btn pop-up__btn_type_close"
            aria-label="Закрыть"
          ></button>
          <img className="pop-up__image-card" src="#" alt="#" />
          <p className="pop-up__subtitle"></p>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
