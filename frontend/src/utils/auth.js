const BASE_URL = 'https://api.mestogram.nomoredomains.monster/';
// const BASE_URL = 'http://localhost:3000';
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
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(getResponse)
        .then((data) => {
            localStorage.setItem('userId', data._id);
            return data;
        })
}
const getContent = () => {
    return fetch(`${BASE_URL}/users/me`,
        {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getResponse);
}
export {
    register,
    authorize,
    getContent
}