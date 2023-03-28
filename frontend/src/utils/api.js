class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
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
                headers: this._headers
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
                headers: this._headers,
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
                headers: this._headers,
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
                headers: this._headers,
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
                headers: this._headers
            })
            .then(res => this._checkResponse(res))
    }

    // изменение аватара профиля
    patchAvatarProfile(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
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
                headers: this._headers
            })
            .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            // удаление лайка карточки
            return fetch(`${this._baseUrl}cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
                .then(res => this._checkResponse(res))
        } else if(!isLiked) {
            // добавление лайка карточке
            return fetch(`${this._baseUrl}cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers,
        })
                .then(res => this._checkResponse(res))
            }
    }
}
const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54/',
        headers: {
            authorization: '0abf54cd-edc4-4fb9-9a14-bce409a2bf77',
            'Content-Type': 'application/json'
        }
    }
);

export default api ;