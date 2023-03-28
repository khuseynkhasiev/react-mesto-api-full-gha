import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const {
        isOpen,
        onClose,
        onUpdateAvatar,
        isNameButton
    } = props;
    const avatarRef = React.useRef('');
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} textButton={isNameButton}>
            <>
                <input ref={avatarRef} type="url" className="popup__input popup__input_type_url" name="link"
                       id="popup-avatar-link"
                       placeholder="Ссылка на аватар" required />
                <span className="popup__error" id="popup-avatar-link-error"></span>
            </>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;