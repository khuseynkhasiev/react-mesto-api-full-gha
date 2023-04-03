import FormIn from "./FormIn";
import {useEffect, useState} from "react";

export default function Register({handleRegister, handleButtonSignIn, setSignIn}) {
    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        setSignIn(true);
    }, [setSignIn])

    function handleUserDate(e) {
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(userDate);
    }

    return (
        <FormIn
            title="Регистрация"
            buttonName="Зарегистрироваться"
            name="register"
            handleUserDate={handleUserDate}
            handleSubmit={handleSubmit}
        >
            <p className="form__subtext">
                Уже зарегистрированы?<span className="form__link" onClick={handleButtonSignIn}> Войти</span>
            </p>
        </FormIn>
    )
}