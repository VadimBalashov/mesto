let showPopupButtonEdit = document.querySelector('.profile__edit-button');
let showPopupButtonAdd = document.querySelector('.profile__add-button');
let showPopupButtonImages = document.querySelector('.element');
let popup = document.querySelector('.popup')
const editFormPopup = document.querySelector('.popup_type_edit');
const editFormPopupClose = editFormPopup.querySelector('.popup__close');
const cardFormPopup = document.querySelector('.popup_type_add');
const addFormPopupClose = cardFormPopup.querySelector('.popup__close');
const imageFormPopup = document.querySelector('.popup_type_image');
const imageFormPopupClose = imageFormPopup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let username = document.querySelector('.profile__title');
let profession = document.querySelector('.profile__profession');
const popupTitle = document.querySelector('.popup__title_image');
const popupImage = document.querySelector('.popup__image');

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function showPopupEdit() {
  nameInput.value = username.textContent
  jobInput.value = profession.textContent
  showPopup(editFormPopup);
}
showPopupButtonEdit.addEventListener('click', showPopupEdit);

function closePopupEdit() {
  editFormPopup.classList.remove('popup_opened');
}
editFormPopupClose.addEventListener('click', closePopupEdit);


function showPopupAdd() {
  showPopup(cardFormPopup);
}
showPopupButtonAdd.addEventListener('click', showPopupAdd);

function closePopupAdd() {
  cardFormPopup.classList.remove('popup_opened');
}
addFormPopupClose.addEventListener('click', closePopupAdd);


function closePopupImages() {
  imageFormPopup.classList.remove('popup_opened');
}
imageFormPopupClose.addEventListener('click', closePopupImages);


function formSubmitHandler (evt) {
    evt.preventDefault();

    username.textContent = nameInput.value;
    profession.textContent = jobInput.value;

    closePopupEdit();
}

formElement.addEventListener('submit', formSubmitHandler);



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
]; 

 const container = document.querySelector('.elements__list');
 const initialCardsform = document.querySelector('.popup__container_add');
 const templateElement = document.querySelector('.template'); //нашли темплейт 

function deliteTaskHandler(evt) {
 evt.target.closest('.element').remove(); //метод closest ищет ближайшего родителя- его и добавим
}

function addTaskListeners(task) { //создаем функцию слушателей на кнопки лайк и удаление
   const deleteButton = task.querySelector('.element__image-trash'); //находим кнопку удаления
   deleteButton.addEventListener('click', deliteTaskHandler); //навешиваем слушатели передаем в них фукцию(в качестве колл-бэка)
  }




function createTaskDomNode( item ){ //создаем функцию, к-рая создает карточку (создает ?дом-ноду? отдельной ?таски?)
  const newItem = templateElement.content.cloneNode(true); //через св-во template получаем содержимое, клонируем содержимое с помощью .content 

  const title = newItem.querySelector('.element__title') //ищем заголовок в разметке элемента списка ( в темплейте)
  title.textContent = item.name; // в этот тайтл засовываем содержимое name из массива
  const image = newItem.querySelector('.element__image') //ищем картинку в разметке элемента списка ( в темплейте)
  image.src = item.link; // в src! засовываем содержимое link из массива

  const likeButton = newItem.querySelector('.element__image-heart'); //устанавливает кнопку лайка в разметку template'a
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__image-heart_active') // меняет стили
  }); // меняет класс кнопки лайка


  image.addEventListener('click', () => {
    showPopupImages(item.name, item.link)
  }); // открываем попам с картинкой
 
  return newItem; //возвращаем готовую дом ноду
}

function showPopupImages (name, link) { //открываем Попап С Картинкой
  popupTitle.textContent = name; //кладем name в подпись под картинкой в попапе
  popupImage.src = link; //кладем link в свойство src тега img в попапе
  popupTitle.alt = name;

  showPopup(imageFormPopup); // обьявим универсальную функцию открытия попапа с аргументом функции открытия попапа с картинкой
};



 function renderList() {
  const result = initialCards.map(function(item){
    const newTask = createTaskDomNode(item); //создадим таску
    addTaskListeners(newTask); // навесим обработчики
    return newTask; // таску вернули
  }); //перебираем массив

  container.append(...result);
}

function addTaskFormListener(evt) { //функция создания карточки, которая срабатывает при клике на кнопку формы
  evt.preventDefault(); //останавливаем перезагрузку браузера
  const nameInput = initialCardsform.querySelector('.popup__input_type_title'); //находим поле ввода из формы title
  const linkInput =  initialCardsform.querySelector('.popup__input_type_link'); //находим поле ввода из формы link

  const item = { //создает объект с двумя ключами. В одном будет лежать значение из одного поля ввода, в другом - из другого. Этот объект надо будет передать в функцию создания новой карточки
    name: nameInput.value, //вставим данные из поля с названием
    link: linkInput.value, //вставим данные из другого поля со ссылкой на картинку
  };  
  
  const newTask = createTaskDomNode(item);  //вызывает другую функцию - функцию создания новой карточки (ту же функцию которая должна срабатывать при создании первых 6 карточек внутри цикла)
  // и передает туда объект из предыдущего пункта. Новую карточку сохраняет в этой созданной переменной.



  addTaskListeners(newTask);


  container.prepend(newTask); // добавляет newTask в разметку страницы, к другим карточкам

  nameInput.value = ''; //очищает поля ввода формы
  linkInput.value = ''; //очищает поля ввода формы

  closePopupAdd(); //закрывает попап
};

renderList();  
initialCardsform.addEventListener('submit', addTaskFormListener);




