export default function Header(props) {
    const {
        email,
        handleUserExit,
        loggedIn,
        signIn,
        handleButtonSignIn,
        handleButtonSignUp,
    } = props;
    return (
        <header className="header">
            <div className="header__logo"></div>
            <nav className="header__nav">
                <ul className="header__list">
                    {email ?
                        <li className="header__el">
                            <button className="header__btn">{email}</button>
                        </li> : null
                    }
                    {loggedIn ?
                        <li className="header__el">
                            <button className="header__btn" onClick={handleUserExit}>Выйти</button>
                        </li> :
                        signIn ?
                            <li className="header__el">
                                <button className="header__btn" onClick={handleButtonSignIn}>Войти</button>
                            </li> :
                            <li className="header__el">
                                <button className="header__btn" onClick={handleButtonSignUp}>Регистрация</button>
                            </li>
                    }
                </ul>
            </nav>
        </header>
    )
}