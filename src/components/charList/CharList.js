import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService.getAllCharacters().then(this.onCharListLoaded);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(arr) {
    const heroesList = arr.map((heroe) => {
      let imageStyle = { objectFit: "cover" };

      if (heroe.thumbnail.indexOf("image_not_available") > -1) {
        imageStyle = { objectFit: "unset" };
      }

      return (
        <li className="char__item" key={heroe.id} onClick={() =>  this.props.onCharSelected(heroe.id)} >
          <img src={heroe.thumbnail} alt="abyss" style={imageStyle} />
          <div className="char__name">{heroe.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{heroesList}</ul>;
  }

  render() {
    const {loading, error, charList} = this.state
    const heroesList = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? heroesList : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
