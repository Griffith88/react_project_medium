import { useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom'

import useMarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage.js";
import Spinner from "../spinner/Spinner";
import "./comicsList.scss";

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(15);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((ofset) => ofset + 8);
    setComicsEnded((comicsEnded) => ended);
  };

  const renderItem = (arr) => {
    const items = arr.map((item) => {
      return (
        <li
          key={item.id}
          tabIndex={0}
          className="comics__item"
        >
          <Link tabIndex={-1} to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.name}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{`${item.price}$`}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };
  const items = renderItem(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
