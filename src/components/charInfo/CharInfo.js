import { Component } from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelService = new MarvelService();

  onUpdateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);

  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  componentDidMount() {
    this.onUpdateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.onUpdateChar();
    }
  }


  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null,
      spinner = loading ? <Spinner /> : null,
      content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

class View extends Component {
  _maxComicsOnPage = 10;
  render() {
    const { char } = this.props;
    const { name, description, thumbnail, homepage, wiki, comics } = char;
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
          {comics.slice(0, this._maxComicsOnPage).map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
