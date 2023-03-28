import PopupWithForm from "./PopupWithForm";
function DeleteCardPopup(props){
    const {
        isOpen,
        onClose,
    } = props;

    return (
        <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={isOpen} onClose={onClose} textButton={'Да'}>
            <h3 className="popup__title">Вы уверены?
            </h3>
        </PopupWithForm>
    )
}
export default DeleteCardPopup;