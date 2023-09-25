import "./singleCharacter.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const SingleCharacter = () => {
  let { charId } = useParams();
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const onUpdateChar = () => {
    if (!charId) {
     return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    console.log(char)
    setChar(char);
  };

  useEffect(() => onUpdateChar(), [charId]);

  const errorMessage = error ? <ErrorMessage /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(loading || error || !char) ? <View char={char} /> : null;

    console.log(content)
  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({char}) => {
  return (
    <div className="single-char">
      <img src={char.thumbnail} alt={char.name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{char.name}</h2>
        <p className="single-char__descr">{char.description}</p>
      </div>
    </div>
  );
};

export default SingleCharacter;
