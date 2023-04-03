class Api {
    constructor({
                    baseUrl,
                }) {
        this._baseUrl = baseUrl;
    }

    getAllPromise() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()])
    }

    // проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    // получение имени профиля от сервера
    getProfileInfo() {

        return fetch(`${this._baseUrl}users/me`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    // редактирования имени профиля на сервере
    patchProfileInfo({
                         name,
                         about
                     }) {

        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => this._checkResponse(res))
    }

    // получение карточек от сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => this._checkResponse(res))
    }

    //отправка новой карточки на сервер
    postNewCard({
                    name,
                    link
                }) {

        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => this._checkResponse(res))
    }

    // получение аватара профиля
    getAvatarProfile() {
        return fetch(`${this._baseUrl}users/me`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    // изменение аватара профиля
    patchAvatarProfile(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => this._checkResponse(res))
    }

    // удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            // удаление лайка карточки
            return fetch(`${this._baseUrl}cards/${id}/likes`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => this._checkResponse(res))
        } else if (!isLiked) {
            // добавление лайка карточке
            return fetch(`${this._baseUrl}cards/${id}/likes`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => this._checkResponse(res))
        }
    }
}


const api = new Api(
    {
        // baseUrl: 'http://localhost:3000/',
        baseUrl: 'https://api.mestogram.nomoredomains.monster/',
    }
);

export default api;