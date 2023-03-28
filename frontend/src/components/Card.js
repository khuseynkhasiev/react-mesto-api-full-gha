import { useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import DeleteCardPopup from "./DeleteCardPopup";
export default function Card(props) {
    const {
        card,
        onCardClick,
        onCardLike,
        onCardDelete
    } = props;
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick(){
        onCardDelete(card);
    }
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `elements__like ${isLiked && 'elements__like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }
    return (
        <li className="elements__el">
            {isOwn ? (
                <button className="elements__trash elements__trash_visible" type="button"
                        aria-label="кнопка удаления карточки" onClick={handleDeleteClick}></button>
            ) : null}
            <img className="elements__img" onClick={handleClick} alt={card.name} src={card.link}/>
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__counter">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"
                            aria-label="кнопка выставления лайка или отмены лайка"></button>
                    <p className="elements__number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}