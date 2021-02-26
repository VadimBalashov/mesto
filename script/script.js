let showPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let username = document.querySelector('.profile__title');
let profession = document.querySelector('.profile__profession');

function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = username.textContent
  jobInput.value = profession.textContent
}
showPopupButton.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);




function formSubmitHandler (evt) {
    evt.preventDefault();

    username.textContent = nameInput.value;
    profession.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 