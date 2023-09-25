import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charForm.scss";
import "../../style/style.scss";
import { useState } from "react";

const CharForm = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, clearError, process, setProcess } =
    useMarvelService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const errorMessage =
    process === "error" ? (
      <div className="error">
        <ErrorMessage />
      </div>
    ) : null;

  const results =
    char && char.length === 0 ? (
      <div className="error">
        The character was not found. Check the name and try again
      </div>
    ) : !char ? null : (
      <div className="char__form-wrapper">
        <div className="char__form-success">
          There is! Visit {char.name} page?
        </div>
        <Link to={`/${char.id}`} className="button button__secondary">
          <div className="inner">To page</div>
        </Link>
      </div>
    );

  const errorsMessage = {
    required: "This field is required",
  };

  return (
    <form
      className="char__form-search"
      onSubmit={handleSubmit((fieldName) => {
        updateChar(fieldName.name);
      })}
      onChange={() => {
        clearError();
        setProcess("waiting");
      }}
    >
      <label className="search__label" htmlFor="">
        Or find a character by name:
      </label>
      <div className="search__container">
        <input
          name="name"
          className="search__input"
          type="text"
          {...register("name", {
            required: true,
          })}
          placeholder="Enter name"
        />

        <button
          className="button button__main"
          disabled={["confirmed", "loading"].includes(process)}
        >
          <div className="inner">Find</div>
        </button>
      </div>
      {errors.name && (
        <div className="error" role="alert">
          {errorsMessage[errors.name.type]}
        </div>
      )}
      {results}
      {errorMessage}
    </form>
  );
};

export default CharForm;
