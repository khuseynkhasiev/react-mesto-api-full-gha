export default function FormIn(props) {
    const {
        buttonName,
        title,
        name,
        children,
        handleUserDate,
        handleSubmit,
    } = props;
    return (
        <div className="form">
            <form action="" className="form__submit" name={name} onSubmit={handleSubmit}>
                <h3 className="form__title">{title}</h3>
                <input
                    type="email"
                    className="form__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleUserDate}/>
                <input
                    type="password"
                    className="form__input"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={handleUserDate}/>
                <button type="submit" className="form__submit-btn">{buttonName}</button>
                {children}
            </form>
        </div>
    )
}