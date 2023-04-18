class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfoData() {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async editProfile({ name, job }) {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async addNewCard({ name, link }) {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async deleteCard(id) {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async switchStateLike(id, state) {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: state,
        headers: this.headers,
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  async editProfileAvatar({ link }) {
    try {
      const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return this._checkResponse(res);
    } catch (err) {
      return console.log(err);
    }
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: '2f3491e1-4e2a-4578-a239-f8abfd519bd8',
    'Content-Type': 'application/json',
  },
});
