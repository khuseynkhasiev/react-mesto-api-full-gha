const BASE_URL = 'https://auth.nomoreparties.co';
const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(getResponse);
}

const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        }).then(getResponse);
}

const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(getResponse);
}

export {
    register,
    authorize,
    getContent
}