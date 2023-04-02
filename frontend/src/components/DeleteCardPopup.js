import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    const {
        isOpen,
        onClose,
        cardForDelete,
        onCardDelete
    } = props;

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        onCardDelete(cardForDelete)
    }

    return (
        <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={isOpen} onClose={onClose} textButton={'Да'} onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default DeleteCardPopup;