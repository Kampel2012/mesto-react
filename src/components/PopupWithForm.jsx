import React from 'react';

const PopupWithForm = (props) => {
  const classes = `pop-up pop-up_data_${props.name} ${
    props.isOpen && 'pop-up_opened'
  }`;

  return (
    <>
      <div className={classes}>
        <div className="pop-up__container">
          <h2 className="pop-up__title">{props.title}</h2>
          <button
            onClick={props.onClose}
            type="button"
            className="pop-up__btn pop-up__btn_type_close"
            aria-label="Закрыть"
          ></button>
          <form
            className={`pop-up__form pop-up__form_data_${props.name}`}
            name={`pop-up-form-${props.name}`} // на будущие корректировки, было pop-up-form-profile-edit и name="pop-up__form_data_cards"
            noValidate
            autoComplete="off"
          >
            <fieldset className="pop-up__set">
              {props.children}
              <button
                className="pop-up__btn pop-up__btn_type_submit"
                type="submit"
              >
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopupWithForm;
