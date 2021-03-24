
const allInputsEmpty = (inputList) => {
    // Если true - все поля пустые
    return !inputList.some(inputElement => inputElement.value.length > 0); //если во всем инпут-листе не найдется ни одного поля значение которого больше 0 - возвращаем ложь
};


const hasInvalidInput = (inputList) => { //проверяем все ли поля пустые?
  return inputList.some(inputElement => !inputElement.validity.valid);
  };


const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) { //если хотя бы один импут невалидный - отключаем кнопку
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true); //выключим кнопку
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


//красит поле красным и выводит ошибку
const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};


//убирает красное поле и снимает ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};



const checkInput = (formElement, inputElement, rest) => { //здесь проверяем валидность какого-то одного импута
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, rest);// Убрать подкрашивание поля красным 
  } else {
    showInputError(formElement, inputElement, rest);// Подкрасить поле красным 

  }
};


//функция навесит обработчики на поля формы (инпутов); вот форма :(formElement) -она поступает на вход. Начинаем с ней работать .
const setInputListeners = (formElement, {inputSelector, submitButtonSelector, ...rest }) => {
const inputList = Array.from(formElement.querySelectorAll(inputSelector));// из этой формы вытаскиваем все импуты
const buttonElement = formElement.querySelector(submitButtonSelector); //нашли кнопку отправки 


inputList.forEach( //навесить обработчики событий полей
 inputElement => {inputElement.addEventListener('input', () => { //пользователь будет что-то вводить в эти поля , а мы будем проверять валидность
  checkInput(formElement, inputElement, rest);//проверить состояние поля (валидно ли оно?)
  toggleButtonState(inputList, buttonElement, rest);//переключить состояние кнопки
  });

   toggleButtonState(inputList, buttonElement, rest);
 }
 );
};




const enableValidation = ({formSelector, ...rest}) => { //включаем валидацию для всех форм
  const formList = Array.from(document.querySelectorAll(formSelector)); //найдем все формы, сразу с помощью Array.from- преобразуем их в массив

  formList.forEach(//"для каждой формы..""
    formElement => { //входной аргумент - элемент формы
      formElement.addEventListener('submit', (event) => {  //навешиваем обработчик (событие сабмит)
event.preventDefault();
      });
      setInputListeners(formElement, rest);//навесить слушатели событий для полей формы(вызываем функцию setInputListeners и передаем туда форму)
    }
  );
};



//запустит процесс наложения валидации на формы 
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_visible'
});



