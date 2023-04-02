import {useEffect} from "react";

function PopupWithForm(props) {
    const {
        title,
        name,
        isOpen,
        onClose,
        children,
        textButton,
        onSubmit
    } = props;

    // eslint-disable-next-line no-unused-expressions
    useEffect(() => {
        if(!isOpen) return;
        const handleOverlayEscClose = event => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            };
        }
        document.addEventListener('keydown', handleOverlayEscClose);
        return () =>{
            document.removeEventListener('keydown', handleOverlayEscClose)
        }
    }), [isOpen, onClose];


    return (
        <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={e => e.stopPropagation()}>
                <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
                <form onSubmit={onSubmit} className="popup__form" name={`popup-form-${name}`} noValidate>
                    <h3 className="popup__title">{title}</h3>
                    {children}
                    <button className="popup__save-btn popup__save-btn_inactive" type="submit">{textButton}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;