import {useEffect} from "react";

export default function ImagePopup({card, onClose, isOpen}) {
    // eslint-disable-next-line no-unused-expressions
    useEffect(() => {
        if (!isOpen) return;
        const handleOverlayEscClose = event => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleOverlayEscClose);
        return () => {
            document.removeEventListener('keydown', handleOverlayEscClose);
        }
    }), [onClose, isOpen]

    return (
        <div className={`popup popup_type_image popup_opacity ${card.isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container-image">
                <figure className="popup__figure">
                    <button className="popup__close" onClick={onClose} type="button"></button>
                    <img src={card.link}
                         alt={card.name}
                         className="popup__image" onClick={e => e.stopPropagation()}/>
                    <figcaption className="popup__figcaption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}