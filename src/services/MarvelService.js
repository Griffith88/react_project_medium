import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=911491da94c06b74a312695c7f9aa182";
  const _baseCharOffset = 210;
  const _baseComicsOffset = 20;
  const _baseAllLimit = 9;
  const _baseComicsLimit = 8;

  const getAllCharacters = async (offset = _baseCharOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=${_baseAllLimit}&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (uid) => {
    const res = await request(`${_apiBase}characters/${uid}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?${_apiKey}&name=${name}`);
    const char =
      res.data.results.length > 0
        ? _transformCharacter(res.data.results[0])
        : [];
    return char;
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(
      `${_apiBase}comics?${_apiKey}&limit=${_baseComicsLimit}&offset=${offset}`
    );
    return res.data.results.map(_transformComics);
  };

  const _transformCharacter = (char) => {
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
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      // optional chaining operator
      price: comics.prices[0].price ? comics.prices[0].price : "not available",
    };
  };

  return {
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
