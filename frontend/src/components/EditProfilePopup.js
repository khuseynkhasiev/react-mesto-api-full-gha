import {useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const {
        isOpen,
        onClose,
        onUpdateUser,
        isNameButton
    } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e){
        setName(e.target.value);
    }
    function handleChangeDescription(e){
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description
        });
    }
    return (
        <PopupWithForm title={'Редактировать профиль'} name={'add'} isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} textButton={isNameButton}>
            <>
                <input onChange={handleChangeName} type="text" className="popup__input popup__input_type_name" name="name" id="popup-name"
                       placeholder="Имя" value={name} minLength="2" maxLength="40" required />
                <span className="popup__error" id="popup-name-error"></span>
                <input onChange={handleChangeDescription} type="text" className="popup__input popup__input_type_about" name="about"
                       id="popup-job"
                       placeholder="Описание" value={description} minLength="2" maxLength="200" required />
                <span className="popup__error" id="popup-job-error"></span>
            </>
        </PopupWithForm>
    )
}
export default EditProfilePopup;