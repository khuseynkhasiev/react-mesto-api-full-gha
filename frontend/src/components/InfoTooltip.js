export default function InfoTooltip(props) {
    const {
        infoToolTipMessage, infoToolTip, onClose
    } = props
    return (<div className={`info-tooltip ${infoToolTip ? "popup_opened" : null} `}>
        <div className="info-tooltip__container">
            <button className="popup__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
            <div className={`${infoToolTipMessage ? "info-tooltip__img" : "info-tooltip__img-error"}`}></div>
            <p className="info-tooltip__text">
                {infoToolTipMessage ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз"}!
            </p>
        </div>
    </div>)
}