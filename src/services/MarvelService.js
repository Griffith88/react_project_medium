class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=911491da94c06b74a312695c7f9aa182";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Couldn't fetch ${url}, status ${res.status}, text ${await res.text()}`
      );
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=123&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (uid) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${uid}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    const [homepage, wiki] = char.urls;
    if (!char.description) {
      char.description = "Описание для данного персонажа пока отсутствует";
    }

    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: homepage.url,
      wiki: wiki.url,
    };
  };
}

export default MarvelService;
