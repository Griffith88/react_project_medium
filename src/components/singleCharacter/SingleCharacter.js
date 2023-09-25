import "./singleCharacter.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SingleCharacter = () => {
  let { charId } = useParams();
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const onUpdateChar = () => {
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

  useEffect(() => onUpdateChar(), [charId]);


  return (
    <>
      {setContent(process, View, char)}
    </>
  );
};

const View = ({ data }) => {
  return (
    <div className="single-char">
      <img src={data.thumbnail} alt={data.name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{data.name}</h2>
        <p className="single-char__descr">{data.description}</p>
      </div>
    </div>
  );
};

export default SingleCharacter;
