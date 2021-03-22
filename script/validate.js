
const allInputsEmpty = (inputList) => {
    // Если true - все поля пустые
    return !inputList.some(inputElement => inputElement.value.length > 0); //если во всем инпут-листе не найдется ни одного пяля значение которого больше 0 - возвращаем ложь
};

const hasInvalidInput = (inputList) => { //проверяем все ли поля пустые?
  return inputList.some(inputElement => !inputElement.validity.valid);
  };

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) { //если хотя бы один импут невалидный - отключаем кнопку
    buttonElement.classList.add('popup__button_invalid');
    buttonElement.setAttribute('disabled', true); //выключим кнопку
  } else {
    buttonElement.classList.remove('popup__button_invalid');
    buttonElement.removeAttribute('disabled');
  }
};


const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('error_visible');
};


const checkInput = (formElement, inputElement) => { //здесь проверяем валидность какого-то одного импута
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);// Убрать подкрашивание поля красным 
  } else {
    showInputError(formElement, inputElement);// Подкрасить поле красным 

  }
};


const setInputListeners = (formElement) => {//функция навесит обработчики на поля формы (инпутов); вот форма :(formElement) -она поступает на вход. Начинаем с ней работать .
const inputList = Array.from(formElement.querySelectorAll('.popup__input'));// из этой формы вытаскиваем все импуты
const buttonElement = formElement.querySelector('.popup__submit'); //нашли кнопку отправки 


inputList.forEach( //навесить обработчики событий полей
 inputElement => {inputElement.addEventListener('input', () => { //пользователь будет что-то вводить в эти поля , а мы будем проверять валидность
  checkInput(formElement, inputElement);//проверить состояние поля (валидно ли оно?)
  toggleButtonState(inputList, buttonElement);//переключить состояние кнопки
  });

   toggleButtonState(inputList, buttonElement);
 }
 );
};


const enableValidation = () => { //включаем валидацию для всех форм
  const formList = Array.from(document.querySelectorAll('.popup__container')); //найдем все формы, сразу с помощью Array.from- преобразуем их в массив

  formList.forEach(//"для каждой формы..""
    formElement => { //входной аргумент - элемент формы
      formElement.addEventListener('submit', (event) => {  //навешиваем обработчик (событие сабмит)
event.preventDefault();
      });
      setInputListeners(formElement);//навесить слушатели событий для полей формы(вызываем функцию setInputListeners и передаем туда форму)
    }
  );
};

enableValidation(); //запустит процесс наложения валидации на формы 



