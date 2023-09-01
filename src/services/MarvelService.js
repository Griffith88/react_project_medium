class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=911491da94c06b74a312695c7f9aa182'
    
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Couldn't fetch ${url}, status ${res.status}, text ${await res.text()}`
      );
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=333&${this._apiKey}`
    );
  };

  getCharacter = (uid) => {
    return this.getResource(
      `${this._apiBase}characters/${uid}?${this._apiKey}`
    );
  };
}

export default MarvelService;
