import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from "../charForm/CharForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedUid, setChar] = useState(null);

  const onCharSelected = (uid) => {
    setChar(uid);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div className="char__form">
          <ErrorBoundary>
            <CharInfo charId={selectedUid} />
          </ErrorBoundary>
          <CharForm />
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
