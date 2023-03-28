import editPen from '../images/avatar__edit-pen.svg';
import Card from "./Card";
import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main(props) {
    const {
        handleEditAvatarClick,
        handleAddPlaceClick,
        handleEditProfileClick,
        onCardClick,
        onCardLike,
        onCardDelete,
        cards
    } = props;
    const currentUser = useContext(CurrentUserContext);
    const {name, about, avatar} = currentUser;
    return (
        <main className="main-content">
            <section className="profile">
                <div className="profile__hover" onClick={handleEditAvatarClick} >
                    <div style={{ backgroundImage: `url(${avatar})`}} className="profile__avatar"></div>
                    <img src={editPen} alt="Карандаш редактирования" className="profile__edit-pen" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="кнопка редактирования" onClick={handleEditProfileClick} ></button>
                    <p className="profile__job">{about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="кнопка добавления" onClick={handleAddPlaceClick}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {
                        cards.map((card) => {
                            return <Card
                                onCardLike={onCardLike}
                                onCardClick={onCardClick}
                                onCardDelete={onCardDelete}
                                card={card}
                                key={card._id}/>
                        })
                    }
                </ul>
            </section>
        </main>
    )
}