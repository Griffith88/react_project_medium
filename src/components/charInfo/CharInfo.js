import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const onUpdateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  useEffect(() => onUpdateChar(), [props.charId]);

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = (props) => {
  const _maxComicsOnPage = 10;

  const { data } = props;
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  let imageStyle = { objectFit: "cover" };

  if (thumbnail.indexOf("image_not_available") > -1) {
    imageStyle = { objectFit: "contain" };
  }

  const comicsCap =
    comics.length > 0 ? null : (
      <> Комиксы для данного персонажа пока отсутствует </>
    );
    
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imageStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={wiki} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={homepage} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsCap}
        {comics.slice(0, _maxComicsOnPage).map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
