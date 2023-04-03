import FormIn from "./FormIn";
import {useEffect, useState} from "react";

export default function Login({handleLogin, setSignIn}) {
    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        setSignIn(false);
    }, [setSignIn])

    function handleUserDate(e) {
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(userDate);
    }

    return (
        <FormIn
            title="Вход"
            buttonName="Войти"
            name="login"
            handleUserDate={handleUserDate}
            handleSubmit={handleSubmit}
        />
    )
}