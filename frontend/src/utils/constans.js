// popups 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupProfileAvatar = document.querySelector('.popup_type_avatar');

// popups button
const popupAddButton = popupAdd.querySelector('.popup__save-btn');
const popupEditButton = popupEdit.querySelector('.popup__save-btn');
const popupProfileAvatarButton = popupProfileAvatar.querySelector('.popup__save-btn');


// popups close button
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');


// popupImage
const popupImageInfo = popupImage.querySelector('.popup__image');
const popupFigcaptionImage = popupImage.querySelector('.popup__figcaption');

// formEdit
const formEdit = popupEdit.querySelector('.popup__container');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_about');

// formAdd
const formAdd = popupAdd.querySelector('.popup__container');
const placeName = formAdd.querySelector('.popup__input_type_place');
const imageLink = formAdd.querySelector('.popup__input_type_url');
const formAddCard = popupAdd.querySelector('.popup__form');


//profile
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__job');

//popups open button
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('.cards-template').content;
const cardsContainer = document.querySelector('.elements__container');

const avatarProfile = document.querySelector('.profile__avatar');
const avatarProfileEdit = document.querySelector('.profile__hover');

let userId; // получаем userId для передачи в класс Card


// создаем объект для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_type_error'
}

export {
    popupImage,
    popupImageInfo,
    popupFigcaptionImage,
    popupProfileAvatar,
    popupEdit,
    popupAdd,
    popupEditCloseButton,
    popupAddCloseButton,
    popupImageCloseButton,
    formEdit,
    nameInput,
    jobInput,
    formAdd,
    formAddCard,
    placeName,
    imageLink,
    profileTitle,
    profileJob,
    profileEditButton,
    profileAddButton,
    cardTemplate,
    cardsContainer,
    validationConfig,
    avatarProfile,
    avatarProfileEdit,
    apiConfig,
    popupAddButton,
    popupEditButton,
    popupProfileAvatarButton,
    userId
};