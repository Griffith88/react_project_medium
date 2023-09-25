import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import setContent from "../../utils/setContent";

const RandomChar = (props) => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
    const timerID = setInterval(updateChar, 1000 * 60 * 60);
    return () => clearInterval(timerID);
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const uid = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(uid).then(onCharLoaded).then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const _maxLengthDescription = 200;

  const { name, thumbnail, homepage, wiki } = data;
  let { description } = data;
  let imageStyle = { objectFit: "cover" };

  if (thumbnail && thumbnail.indexOf("image_not_available") > -1) {
    imageStyle = { objectFit: "contain" };
  }

  if (description && description.length > _maxLengthDescription) {
    description = `${description.slice(0, _maxLengthDescription)}...`;
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imageStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
