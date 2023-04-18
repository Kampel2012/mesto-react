import React from 'react';

const PopupWithForm = ({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
}) => {
  const classes = `pop-up pop-up_data_${name} ${isOpen && 'pop-up_opened'}`;

  return (
    <div className={classes}>
      <div className="pop-up__container">
        <h2 className="pop-up__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="pop-up__btn pop-up__btn_type_close"
          aria-label="Закрыть"
        />
        <form
          className={`pop-up__form pop-up__form_data_${name}`}
          name={`pop-up-form-${name}`} // на будущие корректировки, было pop-up-form-profile-edit и name="pop-up__form_data_cards"
          /* noValidate */
          autoComplete="off"
        >
          <fieldset className="pop-up__set">
            {children}
            <button
              className="pop-up__btn pop-up__btn_type_submit"
              type="submit"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
