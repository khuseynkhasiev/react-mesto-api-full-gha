import {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const {
        isOpen,
        onClose,
        onAddPlace,
        isNameButton
    } = props;

    const [formValues, setFormValues] = useState({name: '', link: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prevState => ({...prevState, [name]: value}));
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(formValues);
    }
    return (
        <PopupWithForm title={'Новое место'} name={'add'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
                       textButton={isNameButton}>
            <>
                <input onChange={handleChange} type="text" className="popup__input popup__input_type_place" name="name"
                       id="popup-place"
                       placeholder="Название" minLength="2" maxLength="30" required/>
                <span className="popup__error" id="popup-place-error"></span>
                <input onChange={handleChange} type="url" className="popup__input popup__input_type_url" name="link"
                       id="popup-link"
                       placeholder="Ссылка на картинку" required/>
                <span className="popup__error" id="popup-link-error"></span>
            </>
        </PopupWithForm>
    )
}
export default AddPlacePopup;