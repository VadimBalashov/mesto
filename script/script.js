let showPopupButton = document.querySelector('#show-popup');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');


function showPopup() {
  popup.classList.add('popup_opened');
}
showPopupButton.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__profession').textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 