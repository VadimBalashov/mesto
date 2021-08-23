const configValid = {
    formSelector: '.popup__container',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: {
        empty:'Это поле обязательно',
        url:'Введите правильный url',
        minSimbols:'Минимальное колличество символов 2'
    }
}



//Валидный ли инпут
function isFieldValid(input, config) {
    input.setCustomValidity('');

    if (input.validity.valueMissing){
        input.setCustomValidity(config.errorClass.empty);
        input.classList.add(config.inputErrorClass);
        return false
    }else{
        input.classList.remove(config.inputErrorClass);
    }

    if (input.validity.tooShort){
        input.setCustomValidity(config.errorClass.minSimbols);
        input.classList.add(config.inputErrorClass);
        return false
    }

    if (input.validity.typeMismatch && input.type === 'url'){
        input.setCustomValidity(config.errorClass.url);
        input.classList.add(config.inputErrorClass);
        return false
    }

    return input.checkValidity();
}
//сама валидация
function validateField(input, config) {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    isFieldValid(input, config);

    errorElement.textContent = input.validationMessage;
}
//Состояние кнопки
function setSubmitButtonState (button, state, config) {
    console.log(state);
    if(state){
        
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;

        return true
    }

    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
}
//обработчик
function handlerInputForm(input, config) {
    const form = input.parentNode;
    const submitButton = form.querySelector(config.submitButtonSelector);

    validateField(input, config);
    

    if(form.checkValidity()){
        setSubmitButtonState(submitButton, true, config);
    } else{
        setSubmitButtonState(submitButton, false, config);
    }
}




const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {handlerInputForm(inputElement, config);}, true);
    });

  };

function enableValidation (config){
    const form= Array.from(document.querySelectorAll('.popup__container'));

   form.forEach((forme) => {
    setEventListeners(forme, config);
   });

}
enableValidation(configValid);
